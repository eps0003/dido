import { Module } from "../module";

export type CatchProps<Input, Output> = {
  module: Module<Input, Output>;
  errorHandler: Module<{ data: Input; error: unknown }, Output>;
};

/**
 * Catches and handles thrown errors.
 */
export class Catch<Input, Output> implements Module<Input, Output> {
  constructor(private props: CatchProps<Input, Output>) {}

  async process(data: Input): Promise<Output> {
    try {
      return await this.props.module.process(data);
    } catch (error) {
      return await this.props.errorHandler.process({ data, error });
    }
  }
}
