import { Module } from "../module";

/**
 * Processes a module for all elements in the input array at the same time, then returns the resulting array once all elements have finished processing.
 */
export class MapAsync<Input, Output> implements Module<Input[], Output[]> {
  constructor(private module: Module<Input, Output>) {}

  async process(data: Input[]): Promise<Output[]> {
    const promises = data.map((x) => this.module.process(x));
    return await Promise.all(promises);
  }
}
