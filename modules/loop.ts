import { Module } from "../middleware";

/**
 * Repeatedly process the module while the predicate is true, passing the processed data between iterations.
 */
export class Loop<T> implements Module<T, T> {
  constructor(
    private module: Module<T, T>,
    private predicate: Module<T, boolean>
  ) {}

  async process(data: T) {
    while (await this.predicate.process(data)) {
      data = await this.module.process(data);
    }
    return data;
  }
}
