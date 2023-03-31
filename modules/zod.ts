import { z, ZodSchema } from "zod";
import Module from "../module";

/**
 * Validates the data against a Zod schema.
 */
export default class Zod<T extends ZodSchema>
  implements Module<unknown, z.infer<T>>
{
  constructor(private schema: T) {}

  async process(data: unknown): Promise<z.infer<T>> {
    return await this.schema.parseAsync(data);
  }
}

export { z };
