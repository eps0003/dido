import Module from "../module";

/**
 * Runs modules at the same time, passing the same input to each module and returning the input once all modules have finished processing.
 */
export default class Fork<T> implements Module<T, T> {
  #modules: Module<T, T>[] = [];

  constructor(modules: Module<T, T>[]) {
    this.#modules = modules;
  }

  async process(data: T): Promise<T> {
    const promises = this.#modules.map((module) => module.process(data));
    await Promise.all(promises);
    return data;
  }
}
