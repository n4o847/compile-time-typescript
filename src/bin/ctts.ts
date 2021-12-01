import yargs from 'yargs/yargs';
import * as ts from 'typescript';
import pkg from '../../package.json';
import { run } from '..';

const argv = yargs(process.argv.slice(2))
  .usage(`Usage: $0 [options] script.ts`)
  .version(`${pkg.name} ${pkg.version}\ntypescript ${ts.version}`)
  .help()
  .demandCommand(1, 1)
  .string('_')
  .parseSync();

async function main() {
  const fileName = argv._[0];
  const bufferList = [];
  for await (const chunk of process.stdin) {
    bufferList.push(Buffer.from(chunk));
  }
  const input = Buffer.concat(bufferList);
  const { output } = await run(fileName, { input });
  process.stdout.write(output.toString());
}

main().catch((e) => {
  console.error(String(e));
  process.exit(1);
});
