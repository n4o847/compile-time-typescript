// https://susisu.hatenablog.com/entry/2020/09/12/214343

type RecurseSub<T>
  = T extends { __rec: never } ? never
  : T extends { __rec: { __rec: infer U } } ? { __rec: RecurseSub<U> }
  : T extends { __rec: infer U } ? U
  : T;

type Recurse<T>
  = T extends { __rec: unknown }
      ? Recurse<RecurseSub<T>>
      : T;

type CharToTuple<C extends string>
  = C extends `0` ? []
  : C extends `1` ? [unknown]
  : C extends `2` ? [unknown, unknown]
  : C extends `3` ? [unknown, unknown, unknown]
  : C extends `4` ? [unknown, unknown, unknown, unknown]
  : C extends `5` ? [unknown, unknown, unknown, unknown, unknown]
  : C extends `6` ? [unknown, unknown, unknown, unknown, unknown, unknown]
  : C extends `7` ? [unknown, unknown, unknown, unknown, unknown, unknown, unknown]
  : C extends `8` ? [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]
  : C extends `9` ? [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]
  : never;

type LessThanOrEqualTo<A extends string, B extends string>
  = ((...xs: CharToTuple<A>) => void) extends ((...xs: CharToTuple<B>) => void) ? 1 : 0;

type Solve<S extends string, T extends string>
  = T extends `${infer X}${infer Y}${infer Tail}\n`
      ? { __rec: Solve<`${S}${LessThanOrEqualTo<X, Y>}`, `${Y}${Tail}\n`> }
      : S;

type Main<Input extends string> = Recurse<Solve<``, Input>>;

export default Main;
