import { Module } from "../module";

type AddBranch<M, T> = M extends Branch<infer A, infer B, infer Output>
  ? Branch<A, B, Output extends unknown[] ? [...Output, T] : [Output, T]>
  : never;

/**
 * Processes modules at the same time, returning the output of all modules once all modules have finished processing.
 */
export class Branch<
  Input,
  FirstOutput,
  Output extends unknown[] = [FirstOutput]
> implements Module<Input, Output>
{
  private modules: Module<Input, unknown>[] = [];

  constructor(module: Module<Input, FirstOutput>) {
    this.modules.push(module);
  }

  add<T>(module: Module<Input, T>): AddBranch<this, T> {
    this.modules.push(module);
    return this as unknown as AddBranch<this, T>;
  }

  async process(data: Input): Promise<Output> {
    const promises = this.modules.map((module) => module.process(data));
    const results = await Promise.all(promises);
    return results as Output;
  }
}
