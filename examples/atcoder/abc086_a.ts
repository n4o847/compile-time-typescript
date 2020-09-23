type Odd = `1` | `3` | `5` | `7` | `9`;

type Main<Input extends string>
  = Input extends `${infer A} ${infer B}\n`
      ? [A, B] extends [`${infer _}${Odd}`, `${infer _}${Odd}`]
          ? `Odd\n`
          : `Even\n`
      : never;

export default Main;
