import Module from "../module";

/**
 * Transforms the input using a transform function.
 */
export default class Transform<Input, Output> implements Module<Input, Output> {
  constructor(private transform: (data: Input) => Output | Promise<Output>) {}

  async process(data: Input): Promise<Output> {
    return await this.transform(structuredClone(data));
  }
}
