import { run } from '../../src';

describe(`atcoder/abc086_a`, () => {
  test(`example 1`, async () => {
    const { output } = await run(`examples/atcoder/abc086_a.ts`, {
      input: Buffer.from(`3 4\n`),
    });
    expect(output.toString()).toBe(`Even\n`);
  });

  test(`example 2`, async () => {
    const { output } = await run(`examples/atcoder/abc086_a.ts`, {
      input: Buffer.from(`1 21\n`),
    });
    expect(output.toString()).toBe(`Odd\n`);
  });
});
