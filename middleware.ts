export interface Module<Input, Output> {
  process: (data: Input) => Output | Promise<Output>;
}

/**
 * Runs modules in order, passing the output of each module to the next as input.
 */
export class SerialJob<Input, Output> implements Module<Input, Output> {
  #modules: Module<any, any>[] = [];

  constructor(module: Module<Input, Output>) {
    this.#modules.push(module);
  }

  pipe<NextOutput>(
    module: Module<Output, NextOutput>
  ): SerialJob<Input, NextOutput> {
    this.#modules.push(module);
    return this as unknown as SerialJob<Input, NextOutput>;
  }

  async process(data: Input): Promise<Output> {
    let d: unknown = data;
    for (const module of this.#modules) {
      d = await module.process(d);
    }
    return d as Output;
  }
}
