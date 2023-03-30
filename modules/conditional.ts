import { Module } from "../middleware";

/**
 * Conditionally processes the module if the predicate is true.
 */
export default class Conditional<T> implements Module<T, T> {
  constructor(
    private module: Module<T, T>,
    private predicate: Module<T, boolean>
  ) {}

  async process(data: T): Promise<T> {
    const shouldProcess = await this.predicate.process(data);
    if (shouldProcess) {
      return await this.module.process(data);
    }
    return data;
  }
}
