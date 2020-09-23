import * as ts from 'typescript';
import { promises as fs } from 'fs';
import * as tmp from 'tmp-promise';
import * as path from 'path';
import { Readable, Writable } from 'stream';

interface RunOptions {
  stdin: Readable;
  stdout: Writable;
}

export async function run(fileName: string, { stdin = process.stdin, stdout = process.stdout }: Partial<RunOptions> = {}) {
  const bufferList = [];
  for await (const chunk of stdin) {
    bufferList.push(Buffer.from(chunk));
  }
  const inputBuffer = Buffer.concat(bufferList);
  const { path: tmpDirPath } = await tmp.dir({ prefix: `compile-time-typescript` });
  const calleeFileName = `callee.ts`;
  const callerFileName = `caller.ts`;
  await Promise.all([
    fs.copyFile(fileName, path.join(tmpDirPath, calleeFileName)),
    fs.writeFile(path.join(tmpDirPath, callerFileName), `
      import Main from './${path.basename(calleeFileName, path.extname(calleeFileName))}';
      type Input = ${JSON.stringify(inputBuffer.toString('binary'))};
      type Output = Main<Input>;
    `),
  ]);
  const program = ts.createProgram({
    rootNames: [path.join(tmpDirPath, callerFileName)],
    options: {
      strict: true,
    },
  });
  const source = program.getSourceFile(path.join(tmpDirPath, callerFileName))!;
  const checker = program.getTypeChecker();

  function visit(node: ts.Node) {
    if (ts.isTypeNode(node)) {
      const type = checker.getTypeFromTypeNode(node);
      if (node.getText() === `Main<Input>`) {
        if (type.isStringLiteral()) {
          stdout.write(type.value);
        } else {
          throw new Error(`type error: ${checker.typeToString(type)}`);
        }
      }
    }
    node.forEachChild(visit);
  }

  source.forEachChild(visit);
  await Promise.all([
    fs.unlink(path.join(tmpDirPath, calleeFileName)),
    fs.unlink(path.join(tmpDirPath, callerFileName)),
  ]);
  await fs.rmdir(tmpDirPath);
}

export async function main(...args: string[]) {
  if (!(args.length === 1 && typeof args[0] === 'string')) {
    throw new Error(`argument error`);
  }
  const fileName = args[0];
  await run(fileName);
}

if (require.main === module) {
  main(...process.argv.slice(2)).catch((e) => {
    console.log(e);
  });
}
