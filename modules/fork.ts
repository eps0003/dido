import { Module } from "../middleware";

/**
 * Runs modules at the same time, passing the same input to each module and returning the input once all modules have finished processing.
 */
export default class Fork<T> implements Module<T, T> {
  #modules: Module<T, unknown>[] = [];

  constructor(modules: Module<T, unknown>[]) {
    this.#modules = modules;
  }

  async process(data: T): Promise<T> {
    const promises = this.#modules.map((module) => module.process(data));
    await Promise.all(promises);
    return data;
  }
}
