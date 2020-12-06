# compile-time-typescript

Enjoy type-level programming with TypeScript!

## Installation

```shell
$ npm install -g compile-time-typescript
```

## Usage

```
$ ctts script.ts
```

## Examples

There are several examples under `examples/`. For examples, `hello.ts`:

```typescript
type Main<Input extends string> = `Hello, ${Input}!\n`;
export default Main;
```

```shell
$ echo -n "world" | ctts hello.ts
Hello, world!
```

## How It Works

We can write a program like this:

```typescript
type Main<Input extends string> = `Hello, ${Input}\n`;
export default Main;
```

Compile-time-typescript saves the program as `callee.ts` and creates `caller.ts`:

```typescript
import Main from './callee';
type Input = "HERE COMES THE INPUT";
type Output = Main<Input>;
```

So the program must have a default export of a generic type that takes a type parameter and constructs a string literal type.

Then compile-time-typescript type-checks `caller.ts` and extracts the type information of `Output`.

If `Output` is a string literal type, its content is printed. Otherwise, an error occurs.
