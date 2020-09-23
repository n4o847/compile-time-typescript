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

type Solve<S extends string, C extends string, T extends string>
  = T extends `2${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `3${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `4${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `5${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}${C}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `6${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}${C}${C}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `7${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}${C}${C}${C}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `8${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}${C}${C}${C}${C}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `9${infer Tail}\n` ? { __rec: Solve<`${S}${C}${C}${C}${C}${C}${C}${C}${C}${C}`, ``, `${Tail}\n`> }
  : T extends `${infer X}${infer Tail}\n`
      ? { __rec: Solve<`${S}${C}`, X, `${Tail}\n`> }
      : `${S}${C}`;

type Main<Input extends string> = Recurse<Solve<``, ``, Input>>;

export default Main;
