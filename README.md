# compile-time-typescript

## Install

```shell
$ git clone https://github.com/n4o847/compile-time-typescript.git
$ cd compile-time-typescript
$ npm install
```

## Usage

```shell
$ echo -n "world" | npx ts-node src examples/hello.ts
Hello, world!
```

## Test

```shell
$ npm test
```

## How it works

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

If `Output` is a string literal type, its content is printed. Otherwise, an error occurrs.
