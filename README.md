# compile-time-typescript

Enjoy type-level programming with TypeScript!

## Installation

```shell
$ npm install -g compile-time-typescript
```

## Usage

```shell
$ ctts script.ts
```

## Examples

There are several examples under `examples/`. For example, `hello.ts`:

```typescript
type Main<Input extends string> = `Hello, ${Input}!\n`;
export default Main;
```

```shell
$ echo -n "world" | ctts hello.ts
Hello, world!
```

## Remarkable features of TypeScript

- From TypeScript 4.1
  - [Template Literal Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#template-literal-types)
  - [Recursive Conditional Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types)
- From TypeScript 4.5
  - [Tail-Recursion Elimination on Conditional Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#tailrec-conditional)
- From TypeScript 4.7 Beta
  - [`extends` Constraints on `infer` Type Variables](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#extends-constraints-on-infer-type-variables)

## How it works

When `ctts script.ts` is executed, compile-time-typescript creates a caller like this:

```typescript
import Main from "/path/to/script";
type Input = "HERE COMES THE INPUT";
type Output = Main<Input>;
```

So the program must have a default export of a generic type that takes a type parameter and constructs a string literal type.

Then compile-time-typescript type-checks the caller and extracts the type information of `Output`.

If `Output` is a string literal type, its content is printed. Otherwise, an error occurs.

## Where it is used

- [hakatashi/esolang-box](https://github.com/hakatashi/esolang-box) - Easy and standardized docker images for 200+ esoteric (and non-esoteric) languages.

## Resources

- [型レベル TypeScript の esolang としての展望について - Qiita](https://qiita.com/n4o847/items/5fb8e1cfe0344eee599f)
