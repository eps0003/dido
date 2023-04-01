import Module from "../module";

/**
 * Processes a module for all elements in the input array and returns the resulting array.
 */
export default class Map<Input, Output> implements Module<Input[], Output[]> {
  constructor(private module: Module<Input, Output>) {}

  async process(data: Input[]): Promise<Output[]> {
    const promises = data.map((x) => this.module.process(x));
    return await Promise.all(promises);
  }
}