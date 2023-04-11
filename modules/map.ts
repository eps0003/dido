import { Module } from "../module";

export type MapProps<Input, Output> = {
  module: Module<Input, Output>;
  synchronous?: Module<Input[], boolean>;
};

/**
 * Processes a module for all elements in the input array, then returns the resulting array once all elements have finished processing.
 */
export class Map<Input, Output> implements Module<Input[], Output[]> {
  constructor(private props: MapProps<Input, Output>) {}

  async process(data: Input[]): Promise<Output[]> {
    const synchronous = (await this.props.synchronous?.process(data)) ?? false;
    return synchronous
      ? await this.processSync(data)
      : await this.processAsync(data);
  }

  private async processSync(data: Input[]): Promise<Output[]> {
    const results: Output[] = [];

    for (let x of data) {
      const result = await this.props.module.process(x);
      results.push(result);
    }

    return results;
  }

  private async processAsync(data: Input[]): Promise<Output[]> {
    const promises = data.map((x) => this.props.module.process(x));
    return await Promise.all(promises);
  }
}
