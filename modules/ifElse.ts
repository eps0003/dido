import Module from "../module";

/**
 * Conditionally processes either module depending on the result of the predicate.
 */
export default class IfElse<Input, Output> implements Module<Input, Output> {
  constructor(
    private predicate: Module<Input, boolean>,
    private trueModule: Module<Input, Output>,
    private falseModule: Module<Input, Output>
  ) {}

  async process(data: Input): Promise<Output> {
    if (await this.predicate.process(data)) {
      return await this.trueModule.process(data);
    } else {
      return await this.falseModule.process(data);
    }
  }
}
