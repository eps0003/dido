import Module from "../module";

/**
 * Catches and handles thrown errors.
 */
export default class CatchError<Input, Output>
  implements Module<Input, Output>
{
  constructor(
    private module: Module<Input, Output>,
    private errorModule: Module<{ data: Input; error: unknown }, Output>
  ) {}

  async process(data: Input): Promise<Output> {
    try {
      return await this.module.process(data);
    } catch (error) {
      return await this.errorModule.process({ data, error });
    }
  }
}
