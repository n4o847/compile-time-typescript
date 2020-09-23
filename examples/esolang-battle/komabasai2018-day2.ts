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

type Solve<S extends string, T extends string>
  = T extends `${infer A0}${infer A1}${infer A2}${infer A3}${infer A4}${infer B0}${infer B1}${infer B2}${infer B3}${infer B4}${infer B5}${infer B6}${infer C0}${infer C1}${infer C2}${infer C3}${infer C4}${infer Tail}\n`
      ? [A0, B0, C0, Tail] extends [`1`, `1`, `1`, `1${infer _}` | ``]
          ? { __rec: Solve<`${S}1`, `${A1}${A2}${A3}${A4}${B0}${B1}${B2}${B3}${B4}${B5}${B6}${C0}${C1}${C2}${C3}${C4}${Tail}\n`> }
          : { __rec: Solve<`${S}0`, `${A1}${A2}${A3}${A4}${B0}${B1}${B2}${B3}${B4}${B5}${B6}${C0}${C1}${C2}${C3}${C4}${Tail}\n`> }
  : T extends `${infer _}${infer Tail}\n`
      ? { __rec: Solve<`${S}0`, `${Tail}\n`> }
      : S;

type Main<Input extends string> = Recurse<Solve<``, Input>>;

export default Main;
