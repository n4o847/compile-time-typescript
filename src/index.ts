import { run } from './temporary';

export { run } from './temporary';

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
