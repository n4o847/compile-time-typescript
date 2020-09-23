import { run } from '../../src';

describe(`esolang-battle/mayfes2019-day1`, () => {
  test(`example`, async () => {
    const { output } = await run(`examples/esolang-battle/mayfes2019-day1.ts`, {
      input: Buffer.from(`j5y2h8pf6l7rq7e9t8m9n8i6w7r2z5m2t2y3r6x7smd2k3v3s5t6e7i7j5o4p8h9b3uyg8l3q2y3f4c9a3e5o6z7o7b2u5\n`),
    });
    expect(output.toString()).toBe(`jjjjjyyhhhhhhhhpfffffflllllllrqqqqqqqeeeeeeeeettttttttmmmmmmmmmnnnnnnnniiiiiiwwwwwwwrrzzzzzmmttyyyrrrrrrxxxxxxxsmddkkkvvvssssstttttteeeeeeeiiiiiiijjjjjoooopppppppphhhhhhhhhbbbuygggggggglllqqyyyffffcccccccccaaaeeeeeoooooozzzzzzzooooooobbuuuuu`);
  });
});
