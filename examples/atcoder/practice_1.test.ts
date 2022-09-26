import { run } from '../../src';

describe(`atcoder/practice_1`, () => {
  test(`example 1`, async () => {
    const { output } = await run(`examples/atcoder/practice_1.ts`, {
      input: `1\n2 3\ntest\n`,
    });
    expect(output).toBe(`6 test\n`);
  });

  test(`example 2`, async () => {
    const { output } = await run(`examples/atcoder/practice_1.ts`, {
      input: `72\n128 256\nmyonmyon\n`,
    });
    expect(output).toBe(`456 myonmyon\n`);
  });
});
