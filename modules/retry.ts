import { Module } from "../module";
import { Fork } from "./fork";

/**
 * Reprocesses the module if an error is thrown up to a specified maximum number of retries.
 */
export class Retry<Input, Output> implements Module<Input, Output> {
  private retryModules: Module<[Input, unknown], unknown>[] = [];

  constructor(
    private maxRetries: Module<Input, number>,
    private module: Module<Input, Output>
  ) {}

  onRetry(module: Module<[Input, unknown], unknown>): this {
    this.retryModules.push(module);
    return this;
  }

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

        await new Fork(...this.retryModules).process([data, error]);
      }
    }
  }
}
