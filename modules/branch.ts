import Module from "../module";

type AddBranch<M, T> = M extends Branch<infer Input, infer Output>
  ? Branch<Input, Output extends unknown[] ? [...Output, T] : [Output, T]>
  : never;

type Tuple<Output> = Output extends unknown[] ? Output : [Output];

/**
 * Processes modules at the same time, returning the output of all modules once all modules have finished processing.
 */
export default class Branch<Input, Output>
  implements Module<Input, Tuple<Output>>
{
  private modules: Module<Input, unknown>[] = [];

  constructor(module: Module<Input, Output>) {
    this.modules.push(module);
  }

  add<T>(module: Module<Input, T>): AddBranch<this, T> {
    this.modules.push(module);
    return this as unknown as AddBranch<this, T>;
  }

  async process(data: Input): Promise<Tuple<Output>> {
    const promises = this.modules.map((module) => module.process(data));
    const results = await Promise.all(promises);
    return results as Tuple<Output>;
  }
}
