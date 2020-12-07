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

## How It Works

When `ctts script.ts` is executed, compile-time-typescript creates a caller like this:

```typescript
import Main from '/path/to/script';
type Input = "HERE COMES THE INPUT";
type Output = Main<Input>;
```

So the program must have a default export of a generic type that takes a type parameter and constructs a string literal type.

Then compile-time-typescript type-checks the caller and extracts the type information of `Output`.

If `Output` is a string literal type, its content is printed. Otherwise, an error occurs.

## Resources

- [hakatashi/esolang-box](https://github.com/hakatashi/esolang-box) - Easy and standardized docker images for 200+ esoteric (and non-esoteric) languages.
