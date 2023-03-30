import Module from "../module";

/**
 * Repeatedly process the module in a for loop, passing the processed data between iterations.
 */
export default class LoopIndex<T> implements Module<T, T> {
  constructor(private range: Range<T>, private module: Module<T, T>) {}

  async process(data: T) {
    for (
      let i = await this.range[0].process(data);
      i < (await this.range[1].process(data));
      i++
    ) {
      data = await this.module.process(data);
    }
    return data;
  }
}

export type Range<T> = [min: Module<T, number>, max: Module<T, number>];
