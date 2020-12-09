import { Encode, Decode, Add } from '../lib/num';

type Main<Input extends string>
  = Input extends `${infer A}\n${infer B} ${infer C}\n${infer S}\n`
      ? `${Decode<Add<Encode<A>, Add<Encode<B>, Encode<C>>>>} ${S}\n`
      : never;

export default Main;
