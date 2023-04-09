import { Module } from "../module";

export type RetryProps<Input, Output> = {
  module: Module<Input, Output>;
  maxRetries: Module<Input, number>;
  onRetry?: Module<[inputData: Input, error: unknown], unknown>;
};

/**
 * Reprocesses the module if an error is thrown up to a specified maximum number of retries.
 */
export class Retry<Input, Output> implements Module<Input, Output> {
  constructor(private props: RetryProps<Input, Output>) {}

  async process(data: Input): Promise<Output> {
    let retries = 0;
    let maxRetries: number;

    while (true) {
      try {
        return await this.props.module.process(data);
      } catch (error) {
        maxRetries ??= await this.props.maxRetries.process(data);

        if (retries >= maxRetries) {
          throw error;
        }
        retries++;

        if (this.props.onRetry) {
          await this.props.onRetry.process([data, error]);
        }
      }
    }
  }
}
