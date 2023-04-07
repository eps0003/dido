import { Module } from "../module";

/**
 * Repeatedly process the module while the predicate is true, passing the processed data between iterations.
 */
export class LoopWhile<T> implements Module<T, T> {
  constructor(
    private predicate: Module<T, boolean>,
    private module: Module<T, T>
  ) {}

  async process(data: T) {
    while (await this.predicate.process(data)) {
      data = await this.module.process(data);
    }
    return data;
  }
}
