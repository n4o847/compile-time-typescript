import { run } from '../../src';

describe(`atcoder/abc086_a`, () => {
  test(`example 1`, async () => {
    const { output } = await run(`examples/atcoder/abc086_a.ts`, {
      input: `3 4\n`,
    });
    expect(output).toBe(`Even\n`);
  });

  test(`example 2`, async () => {
    const { output } = await run(`examples/atcoder/abc086_a.ts`, {
      input: `1 21\n`,
    });
    expect(output).toBe(`Odd\n`);
  });
});
