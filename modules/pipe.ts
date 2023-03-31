import Module from "../module";

/**
 * Runs modules in succession, passing the output of each module to the next as input.
 */
export default class Pipe<Input, Output> implements Module<Input, Output> {
  private modules: Module<any, any>[] = [];

  constructor(module: Module<Input, Output>) {
    this.modules.push(module);
  }

  next<NextOutput>(
    module: Module<Output, NextOutput>
  ): Pipe<Input, NextOutput> {
    this.modules.push(module);
    return this as unknown as Pipe<Input, NextOutput>;
  }

  async process(data: Input): Promise<Output> {
    let d: unknown = data;
    for (const module of this.modules) {
      d = await module.process(d);
    }
    return d as Output;
  }
}
