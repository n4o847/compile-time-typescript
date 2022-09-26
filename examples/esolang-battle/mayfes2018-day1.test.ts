import { run } from '../../src';

describe(`esolang-battle/mayfes2018-day1`, () => {
  test(`example 1`, async () => {
    const { output } = await run(`examples/esolang-battle/mayfes2018-day1.ts`, {
      input: `AAAAAAAAAAAAAAAAAAAAAAAAAA\n`,
    });
    expect(output).toBe(`BCDEFGHIJKLMNOPQRSTUVWXYZA`);
  });

  test(`example 2`, async () => {
    const { output } = await run(`examples/esolang-battle/mayfes2018-day1.ts`, {
      input: `SFBMPCVCSHDKARZHSCTVXSYGST\n`,
    });
    expect(output).toBe(`THEQUICKBROWNFOXJUMPSOVERT`);
  });
});
