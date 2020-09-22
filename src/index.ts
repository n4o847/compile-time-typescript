import * as ts from 'typescript';
import * as fs from 'fs';
import * as tmp from 'tmp';
import * as path from 'path';

function main(...args: string[]) {
  if (!(args.length === 1 && typeof args[0] === 'string')) {
    throw new Error(`argument error`);
  }
  const fileName = args[0];
  const input = fs.readFileSync(process.stdin.fd);
  const tmpDirName = tmp.dirSync({ prefix: `compile-time-typescript` }).name;
  const calleeFileName = `callee.ts`;
  const callerFileName = `caller.ts`;
  fs.copyFileSync(fileName, path.join(tmpDirName, calleeFileName));
  fs.writeFileSync(path.join(tmpDirName, callerFileName), `
    import Main from './${path.basename(calleeFileName, path.extname(calleeFileName))}';
    type Input = ${JSON.stringify(input.toString('binary'))};
    type Output = Main<Input>;
  `);
  const program = ts.createProgram({
    rootNames: [path.join(tmpDirName, callerFileName)],
    options: {
      strict: true,
    },
  });
  const source = program.getSourceFile(path.join(tmpDirName, callerFileName))!;
  const checker = program.getTypeChecker();

  function visit(node: ts.Node) {
    if (ts.isTypeNode(node)) {
      const type = checker.getTypeFromTypeNode(node);
      if (node.getText() === `Main<Input>`) {
        if (type.isStringLiteral()) {
          console.log(type.value);
        } else {
          throw new Error(`type error: ${checker.typeToString(type)}`);
        }
      }
    }
    node.forEachChild(visit);
  }

  source.forEachChild(visit);
  fs.unlinkSync(path.join(tmpDirName, calleeFileName));
  fs.unlinkSync(path.join(tmpDirName, callerFileName));
  fs.rmdirSync(tmpDirName);
}

if (require.main === module) {
  try {
    main(...process.argv.slice(2));
  } catch (e) {
    console.log(e);
  }
}
