type Natural
  = Digit[]
;

type Digit
  = Digit0
  | Digit1
  | Digit2
  | Digit3
  | Digit4
  | Digit5
  | Digit6
  | Digit7
  | Digit8
  | Digit9
;

type Digit0 = [];
type Digit1 = [unknown];
type Digit2 = [unknown, unknown];
type Digit3 = [unknown, unknown, unknown];
type Digit4 = [unknown, unknown, unknown, unknown];
type Digit5 = [unknown, unknown, unknown, unknown, unknown];
type Digit6 = [unknown, unknown, unknown, unknown, unknown, unknown];
type Digit7 = [unknown, unknown, unknown, unknown, unknown, unknown, unknown];
type Digit8 = [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];
type Digit9 = [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];

type EncodeNatural<N extends string>
  = N extends `${infer D}${infer DS}`
      ? [...EncodeNatural<DS>, EncodeDigit<D>]
      : []
;

type DecodeNatural<N extends Natural>
  = DecodeNaturalRec<N> extends infer Result extends string
      ? Result extends ``
          ? `0`
          : Result
      : never
;

type DecodeNaturalRec<N extends Natural>
  = N extends [infer D extends Digit, ...infer DS extends Natural]
      ? `${DecodeNaturalRec<DS>}${DecodeDigit<D>}`
      : ``
;

type EncodeDigit<D extends string>
  = D extends `0` ? Digit0
  : D extends `1` ? Digit1
  : D extends `2` ? Digit2
  : D extends `3` ? Digit3
  : D extends `4` ? Digit4
  : D extends `5` ? Digit5
  : D extends `6` ? Digit6
  : D extends `7` ? Digit7
  : D extends `8` ? Digit8
  : D extends `9` ? Digit9
  : never
;

type DecodeDigit<D extends Digit>
  = D extends Digit0 ? `0`
  : D extends Digit1 ? `1`
  : D extends Digit2 ? `2`
  : D extends Digit3 ? `3`
  : D extends Digit4 ? `4`
  : D extends Digit5 ? `5`
  : D extends Digit6 ? `6`
  : D extends Digit7 ? `7`
  : D extends Digit8 ? `8`
  : D extends Digit9 ? `9`
  : never
;

type AddDigits<D0 extends Digit, D1 extends Digit, Carry extends Digit0 | Digit1 = Digit0>
  = [...D0, ...D1, ...Carry] extends infer Sum
      ? Sum extends [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, ...infer Rest]
          ? [Rest, Digit1]
          : [Sum, Digit0]
      : never
;

type AddNaturals<N0 extends Natural, N1 extends Natural, C0 extends Digit0 | Digit1 = Digit0>
  = N0 extends [infer D0 extends Digit, ...infer DS0 extends Natural]
      ? N1 extends [infer D1 extends Digit, ...infer DS1 extends Natural]
          ? AddDigits<D0, D1, C0> extends [infer S0, infer C1 extends Digit0 | Digit1]
              ? [S0, ...AddNaturals<DS0, DS1, C1>]
              : never
          : C0 extends Digit1
              ? AddNaturals<N0, [C0]>
              : N0
      : C0 extends Digit1
          ? AddNaturals<N1, [C0]>
          : N1
;

export type Encode<N extends string> = EncodeNatural<N>;
export type Decode<N extends Natural> = DecodeNatural<N>;
export type Add<N0 extends Natural, N1 extends Natural> = AddNaturals<N0, N1>;
