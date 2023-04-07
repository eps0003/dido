import { z, ZodSchema } from "zod";
import { Module } from "../module";

/**
 * Validates the input against a Zod schema.
 * @see {@link https://zod.dev/}
 */
export class Validate<T extends ZodSchema>
  implements Module<unknown, z.infer<T>>
{
  constructor(private schema: Module<unknown, T>) {}

  async process(data: unknown): Promise<z.infer<T>> {
    const schema = await this.schema.process(data);
    return await schema.parseAsync(data);
  }
}

export { z };
