import Module from "../module";

/**
 * Runs modules in succession, passing the output of each module to the next as input.
 */
export default class Sequential<Input, Output>
  implements Module<Input, Output>
{
  #modules: Module<any, any>[] = [];

  constructor(module: Module<Input, Output>) {
    this.#modules.push(module);
  }

  next<NextOutput>(
    module: Module<Output, NextOutput>
  ): Sequential<Input, NextOutput> {
    this.#modules.push(module);
    return this as unknown as Sequential<Input, NextOutput>;
  }

  async process(data: Input): Promise<Output> {
    let d: unknown = data;
    for (const module of this.#modules) {
      d = await module.process(d);
    }
    return d as Output;
  }
}
