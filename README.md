# Dido

## Overview

Dido (**D**ata **I**n, **D**ata **O**ut) is an simple yet powerful, modular, vendor-agnostic middleware system with full type support. It turns building a middleware into a plug-and-play experience by combining reusable modules to transform data.

## Fundamentals

Everything in Dido is a module. Modules consist of a single `process()` method that accepts incoming data and transforms it into some output data.

```ts
interface Module<Input, Output> {
  process: (data: Input) => Output | Promise<Output>;
}
```

All modules are built upon this foundation by combining existing modules and custom logic to create increasing levels of abstraction. As the middleware grows in complexity, groups of modules that are used together to perform a common job can be extracted into their own modules for reuse and maintainability.

## Modules

### Batch

Splits the input array into batches of a specified size.

```ts
const batchSize = new Literal(3);

const middleware = new Batch(batchSize);

await middleware.process([1, 2, 3, 4, 5, 6, 7, 8]);
// [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ]
```

### Branch

Processes modules at the same time, returning the output of all modules once all modules have finished processing.

```ts
const add2 = new Transform<number, number>((data) => data + 2);
const subtract2 = new Transform<number, number>((data) => data - 2);
const multiply2 = new Transform<number, number>((data) => data * 2);

const middleware = new Branch(add2).add(subtract2).add(multiply2);

await middleware.process(4);
// [ 6, 2, 8 ]
```

### Catch

Catches and handles thrown errors.

```ts
const throwError = new Throw(new Literal("error thrown"));
const handleError = new Literal("error caught");

const middleware = new Catch(throwError, handleError);

await middleware.process("Hello, World!");
// error caught
```

### ConsoleLog

Logs the input to the console.

```ts
const middleware = new ConsoleLog();

await middleware.process("Hello, World!");
// Hello, World!
```

Console output:

```
Hello, World!
```

### Fork

Processes modules at the same time, returning the input once all modules have finished processing.

```ts
const add2 = new Transform<number, number>((data) => data + 2);
const subtract2 = new Transform<number, number>((data) => data - 2);
const multiply2 = new Transform<number, number>((data) => data * 2);

const middleware = new Fork(add2).add(subtract2).add(multiply2);
//                 new Fork(add2, subtract2, multiply2);

await middleware.process(4);
// 4
```

### Identity

Returns the input as output.

```ts
const middleware = new Identity();

await middleware.process("Hello, World!");
// Hello, World!
```

### If

Conditionally processes the module if the predicate is true.

```ts
const predicate = new Literal(true);
const add2 = new Transform<number, number>((data) => data + 2);

const middleware = new If(predicate, add2);

await middleware.process(4);
// 6
```

### IfElse

Conditionally processes either module depending on the result of the predicate.

```ts
const predicate = new Literal(false);
const add2 = new Transform<number, number>((data) => data + 2);
const add4 = new Transform<number, number>((data) => data + 4);

const middleware = new IfElse(predicate, add2, add4);

await middleware.process(4);
// 8
```

### Literal

Returns the value provided, discarding the input.

```ts
const middleware = new Literal("Goodbye, World!");

await middleware.process("Hello, World!");
// Goodbye, World!
```

### LoopIndex

Repeatedly process the module in a for loop, passing the processed data between iterations.

```ts
// TODO
```

### LoopWhile

Repeatedly process the module while the predicate is true, passing the processed data between iterations.

```ts
const predicate = new Transform<number, boolean>((data) => data < 10);
const increment = new Transform<number, number>((data) => data + 1);

const middleware = new LoopWhile(predicate, increment);

await middleware.process(0);
// 10
```

### Map

Processes a module for all elements in the input array and returns the resulting array.

```ts
const double = new Transform<number, number>((data) => data * 2);

const middleware = new Map(double);

await middleware.process([0, 1, 2, 3, 4, 5]);
// [ 0, 2, 4, 6, 8, 10 ]
```

### Mediate

Processes a module, then allows the result to be processed alongside the initial input data, usually to merge the two.

```ts
// Scenario: Performing an API request
// TODO: Improve example

// Types
type Request = string;
type Response = string;
type Input = { request: Request };
type Output = { request: Request; response: Response };

// Request
const prepareRequest = new Transform<Input, Request>((data) => {
  return data.request;
});
const sendRequest = new Transform<Request, Response>((request) => {
  return "Goodbye, World!";
});
const request = new Pipe(prepareRequest).next(sendRequest);

// Mediator
const mediator = new Transform<[Input, Response], Output>(
  ([input, response]) => ({
    request: input.request,
    response: response,
  })
);

const middleware = new Mediate(request, mediator);

await middleware.process({ request: "Hello, World!" });
// { request: 'Hello, World!', response: 'Goodbye, World!' }
```

### ParseJSON

Parses a JSON string into an object.

```ts
const middleware = new ParseJSON();

await middleware.process('{"hello":"world!"}');
// { hello: 'world!' }
```

### Pipe

Processes modules in succession, passing the output of each module to the next as input.

```ts
const split = new Transform<string, string[]>((data) => data.split(" "));
const reverse = new Transform<string[], string[]>((data) => data.reverse());
const join = new Transform<string[], string>((data) => data.join(" "));

const middleware = new Pipe(split).next(reverse).next(join);

await middleware.process("Hello, World!");
// World! Hello,
```

### ReadFile

Reads a file from the system and returns its contents.

```ts
const filePath = new Identity<string>();

const middleware = new ReadFile(filePath);

await middleware.process("./example.txt");
// Hello, World!
```

`./example.txt`:

```
Hello, World!
```

### Retry

Reprocesses the module if an error is thrown up to a specified maximum number of retries.

```ts
// TODO
```

### StringifyJSON

Converts the input into a JSON string.

```ts
const middleware = new StringifyJSON();

await middleware.process({ hello: "world!" });
// {"hello":"world!"}
```

### Throw

Throws an error.

```ts
const error = new Literal(new Error("uh oh!"));

const middleware = new Throw(error);

await middleware.process("Hello World!");
// *error is thrown*
```

Console output:

```
Error: uh oh!
    at <stack trace>
```

### Transform

Transforms the input using a transform function.

```ts
const transform = (data: number): number => data + 2;

const middleware = new Transform<number, number>(transform);

await middleware.process(4);
// 6
```

### Wait

Waits a specified number of seconds.

```ts
const seconds = new Literal(2);

const middleware = new Wait(seconds);

await middleware.process("Hello, World!");
// *waits 2 seconds*
// Hello, World!
```

### Validate

Validates the input against a Zod schema.

```ts
const schema = new Literal(z.string());

const middleware = new Validate(schema);

await middleware.process("Hello, World!");
// Hello, World!
```
