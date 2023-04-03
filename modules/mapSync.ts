import Module from "../module";

/**
 * Processes a module for all elements in the input array in succession, then returns the resulting array once all elements have finished processing.
 */
export default class MapSync<Input, Output>
  implements Module<Input[], Output[]>
{
  constructor(private module: Module<Input, Output>) {}

  async process(data: Input[]): Promise<Output[]> {
    const results: Output[] = [];

    for (let x of data) {
      const result = await this.module.process(x);
      results.push(result);
    }

    return results;
  }
}
