# Dido

Dido (**D**ata **I**n, **D**ata **O**ut; pronounced 'dai-doh') is a simple yet powerful, modular, vendor-agnostic middleware system written in TypeScript. It turns building a middleware into a plug-and-play experience by combining reusable modules to transform data.

## Overview

Everything in Dido is a module. Modules consist of a single `process()` method that accepts data as input and transforms it into some output data.

```ts
type Module<Input, Output> = {
  process(data: Input): Output | Promise<Output>;
};
```

All modules are built upon this foundation by combining existing modules and custom logic to create increasing levels of abstraction. As the middleware grows in complexity, groups of modules that are used together to perform a common job can be extracted into their own modules for reuse and maintainability.

## Modules

| Type           | Modules                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Array          | [Batch](#batch) • [Filter](#filter) • [Flatten](#flatten) • [Group](#group) • [Map](#map)           |
| Basic          | [Identity](#identity) • [Literal](#literal) • [Transform](#transform)                               |
| Control Flow   | [Branch](#branch) • [Fork](#fork) • [If](#if) • [Loop](#loop) • [Mediate](#mediate) • [Pipe](#pipe) |
| Error Handling | [Catch](#catch) • [Retry](#retry) • [Throw](#throw)                                                 |
| File System    | [ReadFile](#readfile) • [WriteFile](#writefile)                                                     |
| HTTP           | [Fetch](#fetch) • [FetchJSON](#fetchjson) • [FetchText](#fetchtext)                                 |
| JSON           | [ParseJSON](#parsejson) • [StringifyJSON](#stringifyjson)                                           |
| Logging        | [Log](#log) • [LogTime](#logtime)                                                                   |
| Time           | [Time](#time) • [Wait](#wait)                                                                       |
| Validation     | [Validate](#validate)                                                                               |

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
const middleware = new Catch({
  module: new Throw(new Literal("error thrown")),
  errorHandler: new Literal("error caught"),
});

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

await middleware.process("https://jsonplaceholder.typicode.com/posts/1");
// { id: 1, title: '...', body: '...', userId: 1 }
```

### FetchText

Performs an HTTP request and returns the response as text.

```ts
const middleware = new FetchText();

await middleware.process("https://www.google.com/");
// <!doctype html> ... </html>
```

### Filter

Returns the elements of the input array based on the result of the predicate.

```ts
const predicate = new Transform<number, boolean>((val) => val % 2 === 0);

const middleware = new Filter(predicate);

await middleware.process([1, 2, 3, 4, 5, 6]);
// [ 2, 4, 6 ]
```

### Flatten

Flattens a multi-dimensional array by one level. For example, a three-dimensional array will flatten to two dimensions.

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

### Group

Partitions elements of the input array into any number of groups.

```ts
type NumberGroup = "even" | "odd" | "square";

const grouping = new Transform<number, NumberGroup[]>((data) => {
  const groups: NumberGroup[] = [];
  if (data % 2 === 0) groups.push("even");
  if (data % 2 !== 0) groups.push("odd");
  if (Math.sqrt(data) % 1 === 0) groups.push("square");
  return groups;
});

const middleware = new Group(grouping);

await middleware.process([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
// { even: [ 0, 2, 4, 6, 8 ], odd: [ 1, 3, 5, 7, 9 ], square: [ 0, 1, 4, 9 ] }
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
const middleware = new If<number>({
  predicate: new Literal(true),
  onTrue: new Transform((data) => data + 2),
  onFalse: new Transform((data) => data + 4),
});

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
const middleware = new LogTime({
  module: new Wait(new Literal(2)),
});

await middleware.process("Hello, World!");
// *waits 2 seconds*
// Hello, World!
```

Console output:

```
2.016 seconds
```

### Loop

Repeatedly process the module while the predicate is true, passing the processed data between iterations.

```ts
const middleware = new Loop<number>({
  predicate: new Transform((data) => data < 10),
  module: new Transform((data) => data + 1),
});

await middleware.process(0);
// 10
```

### Map

Processes a module for all elements in the input array, then returns the resulting array once all elements have finished processing.

```ts
const double = new Transform<number, number>((data) => data * 2);
const wait = new Wait(new Literal(2));

const middleware = new Map({
  module: new Pipe(double).next(wait),
  synchronous: new Literal(true),
});

await middleware.process([1, 2, 3, 4, 5]);
// *waits 10 seconds*
// [ 2, 4, 6, 8, 10 ]
```

### Mediate

Processes a module, then allows the result to be processed alongside the initial input data, usually to merge the two.

```ts
type Input = { postId: number };
type Output = { postId: number; post: Post };
type Post = z.infer<typeof schema>;

const schema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

const prepare = new Transform<Input, string>(({ postId }) => {
  return `https://jsonplaceholder.typicode.com/posts/${postId}`;
});
const fetch = new FetchJSON();
const validate = new Validate(new Literal(schema));

const middleware = new Mediate<Input, Post, Output>({
  module: new Pipe(prepare).next(fetch).next(validate),
  mediator: new Transform(([input, response]) => ({
    postId: input.postId,
    post: response,
  })),
});

await middleware.process({ postId: 1 });
// { postId: 1, post: { id: 1, title: '...', body: '...', userId: 1 } }
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
const middleware = new ReadFile({
  filePath: new Identity(),
});

await middleware.process("./file.txt");
// Hello, World!
```

`./file.txt`:

```
Hello, World!
```

### Retry

Reprocesses the module if an error is thrown up to a specified maximum number of retries.

```ts
const logAttempt = new Log();
const throwError = new Throw(new Literal(new Error("uh oh!")));

const middleware = new Retry({
  maxRetries: new Literal(2),
  module: new Pipe(logAttempt).next(throwError),
  onRetry: new Log(new Literal("retry")),
});

await middleware.process("Hello, World!");
// *error is thrown*
```

Console output:

```
Hello, World!
retry
Hello, World!
retry
Hello, World!
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
// { data: 'Hello, World!', duration: 2012 }
```

### Transform

Transforms the input using a transform function.

```ts
const transform = (data: number): number => data + 2;

const middleware = new Transform(transform);

await middleware.process(4);
// 6
```

### Validate

Validates the input against a [Zod](https://zod.dev/) schema.

```ts
const schema = new Literal(z.string());

const middleware = new Validate(schema);

await middleware.process("Hello, World!");
// Hello, World!
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

### WriteFile

Writes a file to the file system, then returns the input.

```ts
const append = new WriteFile<string>({
  filePath: new Literal("./exorcise.txt"),
  fileData: new Transform((data) => data + "\n"),
  options: new Literal({ flag: "a" }),
});

const middleware = new Pipe(append).next(append).next(append);

const result = await middleware.process("Beetlejuice");
// Beetlejuice
```

`./exorcise.txt`:

```
Beetlejuice
Beetlejuice
Beetlejuice
```
