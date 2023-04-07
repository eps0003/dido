import { FetchJSON } from "./modules/fetchJSON";
import { Literal } from "./modules/literal";
import { Mediate } from "./modules/mediate";
import { Pipe } from "./modules/pipe";
import { Transform } from "./modules/transform";
import { Validate, z } from "./modules/validate";

async function main() {
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

  const result = await middleware.process({ postId: 1 });
  console.log(result);
}

main();
