import * as ts from 'typescript';
import { promises as fs } from 'fs';
import * as tmp from 'tmp-promise';
import * as path from 'path';

interface RunOptions {
  input: Buffer;
}

interface RunResult {
  output: Buffer;
}

export async function run(fileName: string, { input = Buffer.of() }: Partial<RunOptions> = {}): Promise<RunResult> {
  const calleePath = path.resolve(process.cwd(), fileName);
  const calleePathParsed = path.parse(calleePath);
  const calleePathWithoutExt = `${calleePathParsed.dir}${path.sep}${calleePathParsed.name}`;
  const { path: callerPath, cleanup } = await tmp.file({ prefix: `compile-time-typescript`, postfix: `caller.ts` });
  await fs.writeFile(callerPath, `
    import Main from ${JSON.stringify(calleePathWithoutExt)};
    type Input = ${JSON.stringify(input.toString('binary'))};
    type Output = Main<Input>;
  `);
  const program = ts.createProgram({
    rootNames: [callerPath],
    options: {
      strict: true,
    },
  });
  const source = program.getSourceFile(callerPath)!;
  const checker = program.getTypeChecker();
  const outputList: Buffer[] = [];

  function visit(node: ts.Node) {
    const symbol = checker.getSymbolAtLocation(node);
    if (symbol && symbol.getName() === `Output`) {
      const type = checker.getDeclaredTypeOfSymbol(symbol);
      if (type.isStringLiteral()) {
        outputList.push(Buffer.from(type.value));
      } else {
        throw new Error(`type error: ${checker.typeToString(type)}`);
      }
    }
    node.forEachChild(visit);
  }

  source.forEachChild(visit);
  await cleanup();
  return {
    output: Buffer.concat(outputList),
  };
}
