import { Module } from "../middleware";
import Literal from "./literal";

/**
 * Reprocesses the module if an error is thrown up to a specified maximum number of retries.
 */
export default class RetryOnError<Input, Output>
  implements Module<Input, Output>
{
  constructor(
    private maxRetries: Module<Input, number> = new Literal(3),
    private module: Module<Input, Output>
  ) {}

  async process(data: Input): Promise<Output> {
    let retries = 0;
    const maxRetries = await this.maxRetries.process(data);

    while (true) {
      try {
        return await this.module.process(data);
      } catch (error) {
        if (retries >= maxRetries) {
          throw error;
        }
        retries++;
      }
    }
  }
}
