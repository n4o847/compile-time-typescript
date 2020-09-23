type ToTuple<A extends string>
  = A extends `0` ? []
  : A extends `1` ? [unknown]
  : never;

type Main<Input extends string>
  = Input extends `${infer A}${infer B}${infer C}\n`
      ? [...ToTuple<A>, ...ToTuple<B>, ...ToTuple<C>] extends [...infer Sum]
          ? `${Sum['length']}\n`
          : never
      : never;

export default Main;
