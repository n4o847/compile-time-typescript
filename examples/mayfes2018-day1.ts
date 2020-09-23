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

type RotateSub<C extends string, N extends unknown[]>
  = N extends [unknown, ...infer M]
      ? ( C extends `A` ? { __rec: RotateSub<`B`, M> }
        : C extends `B` ? { __rec: RotateSub<`C`, M> }
        : C extends `C` ? { __rec: RotateSub<`D`, M> }
        : C extends `D` ? { __rec: RotateSub<`E`, M> }
        : C extends `E` ? { __rec: RotateSub<`F`, M> }
        : C extends `F` ? { __rec: RotateSub<`G`, M> }
        : C extends `G` ? { __rec: RotateSub<`H`, M> }
        : C extends `H` ? { __rec: RotateSub<`I`, M> }
        : C extends `I` ? { __rec: RotateSub<`J`, M> }
        : C extends `J` ? { __rec: RotateSub<`K`, M> }
        : C extends `K` ? { __rec: RotateSub<`L`, M> }
        : C extends `L` ? { __rec: RotateSub<`M`, M> }
        : C extends `M` ? { __rec: RotateSub<`N`, M> }
        : C extends `N` ? { __rec: RotateSub<`O`, M> }
        : C extends `O` ? { __rec: RotateSub<`P`, M> }
        : C extends `P` ? { __rec: RotateSub<`Q`, M> }
        : C extends `Q` ? { __rec: RotateSub<`R`, M> }
        : C extends `R` ? { __rec: RotateSub<`S`, M> }
        : C extends `S` ? { __rec: RotateSub<`T`, M> }
        : C extends `T` ? { __rec: RotateSub<`U`, M> }
        : C extends `U` ? { __rec: RotateSub<`V`, M> }
        : C extends `V` ? { __rec: RotateSub<`W`, M> }
        : C extends `W` ? { __rec: RotateSub<`X`, M> }
        : C extends `X` ? { __rec: RotateSub<`Y`, M> }
        : C extends `Y` ? { __rec: RotateSub<`Z`, M> }
        : C extends `Z` ? { __rec: RotateSub<`A`, M> }
        : ``
        )
      : C;

type Rotate<C extends string, N extends unknown[]> = Recurse<RotateSub<C, N>>;

type Solve<S extends string, T extends string, N extends unknown[]>
  = T extends `${infer C}${infer CS}`
      ? { __rec: Solve<`${S}${Rotate<C, N>}`, CS, [unknown, ...N]> }
      : S;

type Main<Input extends string> = Recurse<Solve<``, Input, [unknown]>>;

export default Main;
