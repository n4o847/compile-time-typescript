import { run } from '../src';

describe(`mayfes2018-day1`, () => {
  test(`example 1`, async () => {
    const { output } = await run(`examples/mayfes2018-day1.ts`, {
      input: Buffer.from(`AAAAAAAAAAAAAAAAAAAAAAAAAA\n`),
    });
    expect(output.toString()).toBe(`BCDEFGHIJKLMNOPQRSTUVWXYZA`);
  });

  test(`example 2`, async () => {
    const { output } = await run(`examples/mayfes2018-day1.ts`, {
      input: Buffer.from(`SFBMPCVCSHDKARZHSCTVXSYGST\n`),
    });
    expect(output.toString()).toBe(`THEQUICKBROWNFOXJUMPSOVERT`);
  });
});
