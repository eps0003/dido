import { Loop } from "./modules/loop";
import { Transform } from "./modules/transform";

async function main() {
  // type Input = { postId: number };
  // type Output = { postId: number; post: Post };
  // type Post = z.infer<typeof schema>;

  // const schema = z.object({
  //   id: z.number(),
  //   title: z.string(),
  //   body: z.string(),
  //   userId: z.number(),
  // });

  // const prepare = new Transform<Input, string>(({ postId }) => {
  //   return `https://jsonplaceholder.typicode.com/posts/${postId}`;
  // });
  // const fetch = new FetchJSON();
  // const validate = new Validate(new Literal(schema));

  // const middleware = new Mediate<Input, Post, Output>({
  //   module: new Pipe(prepare).next(fetch).next(validate),
  //   mediator: new Transform(([input, response]) => ({
  //     postId: input.postId,
  //     post: response,
  //   })),
  // });

  const middleware = new Loop<number>({
    predicate: new Transform((data) => data < 10),
    module: new Transform((data) => data + 1),
  });

  const result = await middleware.process(0);
  console.log(result);
}

main();
