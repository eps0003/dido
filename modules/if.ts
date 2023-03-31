import Module from "../module";

/**
 * Conditionally processes the module if the predicate is true.
 */
export default class If<T> implements Module<T, T> {
  constructor(
    private predicate: Module<T, boolean>,
    private module: Module<T, T>
  ) {}

  async process(data: T): Promise<T> {
    const shouldProcess = await this.predicate.process(data);
    if (shouldProcess) {
      return await this.module.process(data);
    }
    return data;
  }
}
