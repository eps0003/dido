import Module from "../module";

/**
 * Processes modules at the same time, returning the input once all modules have finished processing.
 */
export default class Fork<T> implements Module<T, T> {
  private modules: Module<T, unknown>[] = [];

  constructor(...modules: Module<T, unknown>[]) {
    this.modules = modules;
  }

  add(module: Module<T, unknown>): this {
    this.modules.push(module);
    return this;
  }

  async process(data: T): Promise<T> {
    const promises = this.modules.map((module) => module.process(data));
    await Promise.all(promises);
    return data;
  }
}
