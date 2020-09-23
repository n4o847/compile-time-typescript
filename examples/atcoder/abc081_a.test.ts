import { run } from '../../src';

describe(`atcoder/abc081_a`, () => {
  test(`example 1`, async () => {
    const { output } = await run(`examples/atcoder/abc081_a.ts`, {
      input: Buffer.from(`101\n`),
    });
    expect(output.toString()).toBe(`2\n`);
  });

  test(`example 2`, async () => {
    const { output } = await run(`examples/atcoder/abc081_a.ts`, {
      input: Buffer.from(`000\n`),
    });
    expect(output.toString()).toBe(`0\n`);
  });
});
