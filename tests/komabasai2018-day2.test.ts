import { run } from '../src';

describe(`komabasai2018-day2`, () => {
  test(`example`, async () => {
    const { output } = await run(`examples/komabasai2018-day2.ts`, {
      input: Buffer.from(`10001101001110000000110011101001011011001011111000\n`),
    });
    expect(output.toString()).toBe(`00000000000000000000000000001000000000000000000000`);
  });
});
