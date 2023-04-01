import Module from "../module";

type AddBranch<M, T> = M extends Module<infer Input, infer Output>
  ? Branch<Input, Output extends unknown[] ? [...Output, T] : [Output, T]>
  : never;

/**
 * Runs modules at the same time, returning the output of all modules once all modules have finished processing.
 */
export default class Branch<Input, Output> implements Module<Input, Output> {
  private modules: Module<Input, unknown>[] = [];

  constructor(module: Module<Input, Output>) {
    this.modules.push(module);
  }

  add<T>(module: Module<Input, T>): AddBranch<Branch<Input, Output>, T> {
    this.modules.push(module);
    return this as unknown as AddBranch<Branch<Input, Output>, T>;
  }

  async process(data: Input): Promise<Output> {
    const promises = this.modules.map((module) => module.process(data));
    const results = await Promise.all(promises);
    return results as unknown as Promise<Output>;
  }
}
