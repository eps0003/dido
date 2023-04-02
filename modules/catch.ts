import Module from "../module";

/**
 * Catches and handles thrown errors.
 */
export default class Catch<Input, Output> implements Module<Input, Output> {
  constructor(
    private module: Module<Input, Output>,
    private handleError: Module<[Input, unknown], Output>
  ) {}

  async process(data: Input): Promise<Output> {
    try {
      return await this.module.process(data);
    } catch (error) {
      return await this.handleError.process([data, error]);
    }
  }
}
