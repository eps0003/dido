# Dido

Dido (**D**ata **I**n, **D**ata **O**ut; pronounced 'dai-doh') is an simple yet powerful, modular, vendor-agnostic middleware system written in TypeScript. It turns building a middleware into a plug-and-play experience by combining reusable modules to transform data.

## Overview

Everything in Dido is a module. Modules consist of a single `process()` method that accepts data as input and transforms it into some output data.

```ts
interface Module<Input, Output> {
  process: (data: Input) => Output | Promise<Output>;
}
```

All modules are built upon this foundation by combining existing modules and custom logic to create increasing levels of abstraction. As the middleware grows in complexity, groups of modules that are used together to perform a common job can be extracted into their own modules for reuse and maintainability.

## Modules

| Type           | Modules                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Array          | [Batch](#batch) • [Flatten](#flatten) • [MapAsync](#mapasync) • [MapSync](#mapsync)                                                     |
| Basic          | [Identity](#identity) • [Literal](#literal) • [Transform](#transform)                                                                   |
| Control Flow   | [Branch](#branch) • [Fork](#fork) • [If](#if) • [LoopIndex](#loopindex) • [LoopWhile](#loopwhile) • [Mediate](#mediate) • [Pipe](#pipe) |
| Error Handling | [Catch](#catch) • [Retry](#retry) • [Throw](#throw)                                                                                     |
| File System    | [ReadFile](#readfile)                                                                                                                   |
| HTTP           | [Fetch](#fetch) • [FetchJSON](#fetchjson) • [FetchText](#fetchtext)                                                                     |
| JSON           | [ParseJSON](#parsejson) • [StringifyJSON](#stringifyjson)                                                                               |
| Logging        | [Log](#log) • [LogTime](#logtime)                                                                                                       |
| Time           | [Time](#time) • [Wait](#wait)                                                                                                           |
| Validation     | [Validate](#validate)                                                                                                                   |

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

### Fetch

Performs an HTTP request and returns the response object.

```ts
// TODO
```

### FetchJSON

Performs an HTTP request and returns the response as JSON.

```ts
const middleware = new FetchJSON();

await middleware.process("https://example.com/api/data");
// { ... }
```

### FetchText

Performs an HTTP request and returns the response as text.

```ts
const middleware = new FetchText();

await middleware.process("https://example.com/api/lorem");
// Lorem ipsum dolor sit amet, consectetur adipiscing elit...
```

### Log

Logs the result of the module to the console if specified, otherwise, logs the input to the console. The input is returned as output.

```ts
const middleware1 = new Log();
await middleware1.process("Hello, World!");
// Hello, World!

const middleware2 = new Log(new Literal("Goodbye, World!"));
await middleware2.process("Hello, World!");
// Hello, World!
```

Console output:

```
Hello, World!
Goodbye, World!
```

### LogTime

Processes the module and logs how long it took to process when finished, then returns the result of the module.

```ts
const wait = new Wait(new Literal(2));

const middleware = new LogTime(wait);

await middleware.process("Hello, World!");
// *waits 2 seconds*
// Hello, World!
```

Console output:

```
2.016 seconds
```

### Flatten

Flatten a multi-dimensional array by one level. For example, a three-dimensional array will flatten to two dimensions.

```ts
const middleware = new Flatten();

await middleware.process([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8],
]);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

### Fork

Processes modules at the same time, returning the input once all modules have finished processing.

```ts
const add2 = new Transform<number, number>((data) => data + 2);
const subtract2 = new Transform<number, number>((data) => data - 2);
const multiply2 = new Transform<number, number>((data) => data * 2);

const middleware = new Fork(add2, subtract2, multiply2);
//                 new Fork(add2).add(subtract2).add(multiply2);
//                 new Fork().add(add2).add(subtract2).add(multiply2);

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

Conditionally processes modules depending on the result of the predicate.

```ts
const predicate = new Literal(true);
const add2 = new Transform<number, number>((data) => data + 2);
const add4 = new Transform<number, number>((data) => data + 4);

const middleware = new If(predicate).onTrue(add2).onFalse(add4);

await middleware.process(4);
// 6
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

### MapAsync

Processes a module for all elements in the input array at the same time, then returns the resulting array once all elements have finished processing.

```ts
const double = new Transform<number, number>((data) => data * 2);
const wait = new Wait(new Literal(2));
const doubleAndWait = new Pipe(double).next(wait);

const middleware = new MapAsync(doubleAndWait);

await middleware.process([1, 2, 3, 4, 5]);
// *waits 2 seconds*
// [ 2, 4, 6, 8, 10 ]
```

### MapSync

Processes a module for all elements in the input array in succession, then returns the resulting array once all elements have finished processing.

```ts
const double = new Transform<number, number>((data) => data * 2);
const wait = new Wait(new Literal(2));
const doubleAndWait = new Pipe(double).next(wait);

const middleware = new MapSync(doubleAndWait);

await middleware.process([1, 2, 3, 4, 5]);
// *waits 10 seconds*
// [ 2, 4, 6, 8, 10 ]
```

### Mediate

Processes a module, then allows the result to be processed alongside the initial input data, usually to merge the two.

```ts
// Scenario: Performing an API request

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
  // Imagine this sends an API request using the provided
  // request data which responds with the following response
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

Reads a file from the file system and returns its contents.

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
const maxRetries = new Literal(2);

const logAttempt = new Log();
const throwError = new Throw(new Literal(new Error("uh oh!")));
const badModule = new Pipe(logAttempt).next(throwError);

const logRetry = new Log(new Literal("retry"));

const middleware = new Retry(maxRetries, badModule).onRetry(logRetry);

await middleware.process("Hello, World!");
// *error is thrown*
```

Console output:

```
Hello World!
retry
Hello World!
retry
Hello World!
Error: uh oh!
    at <stack trace>
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

await middleware.process("Hello, World!");
// *error is thrown*
```

Console output:

```
Error: uh oh!
    at <stack trace>
```

### Time

Processes the module and returns result along with how long it took to process in milliseconds.

```ts
const wait = new Wait(new Literal(2));

const middleware = new Time(wait);

await middleware.process("Hello, World!");
// *waits 2 seconds*
// [ 'Hello, World!', 2012 ]
```

### Transform

Transforms the input using a transform function.

```ts
const transform = (data: number): number => data + 2;

const middleware = new Transform(transform);

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

Validates the input against a [Zod](https://zod.dev/) schema.

```ts
const schema = new Literal(z.string());

const middleware = new Validate(schema);

await middleware.process("Hello, World!");
// Hello, World!
```
