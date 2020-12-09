import * as ts from 'typescript';
import * as tmp from 'tmp-promise';
import * as path from 'path';

interface RunOptions {
  input: Buffer;
}

interface RunResult {
  output: Buffer;
}

export async function run(fileName: string, { input = Buffer.of() }: Partial<RunOptions> = {}): Promise<RunResult> {
  const callerFileName = await tmp.tmpName({ prefix: `compile-time-typescript`, postfix: `caller.ts` });
  const callerSourceFile = ts.createSourceFile(callerFileName, `
    import Main from ${JSON.stringify(path.resolve(fileName).replace(/\.ts$/, ''))};
    type Input = ${JSON.stringify(input.toString('binary'))};
    type Output = Main<Input>;
  `, ts.ScriptTarget.Latest);

  const defaultCompilerHost = ts.createCompilerHost({});
  const customCompilerHost: ts.CompilerHost = {
    ...defaultCompilerHost,
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: ((message: string) => void), shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {
      if (fileName === callerFileName) {
        return callerSourceFile;
      } else {
        return defaultCompilerHost.getSourceFile.call(this, fileName, languageVersion, onError, shouldCreateNewSourceFile);
      }
    },
  };

  const program = ts.createProgram({
    rootNames: [callerFileName],
    options: {
      strict: true,
    },
    host: customCompilerHost,
  });
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

  callerSourceFile.forEachChild(visit);

  return {
    output: Buffer.concat(outputList),
  };
}

export async function main(...args: string[]) {
  if (!(args.length === 1 && typeof args[0] === 'string')) {
    throw new Error(`argument error`);
  }
  const fileName = args[0];
  const bufferList = [];
  for await (const chunk of process.stdin) {
    bufferList.push(Buffer.from(chunk));
  }
  const input = Buffer.concat(bufferList);
  const { output } = await run(fileName, { input });
  process.stdout.write(output.toString());
}

if (require.main === module) {
  main(...process.argv.slice(2)).catch((e) => {
    console.error(e);
  });
}
