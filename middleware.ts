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

  add<NextOutput>(
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

/**
 * Runs modules at the same time, passing the same input to each module and returning the input once all modules have finished processing.
 */
export class ParallelJob<Data> implements Module<Data, Data> {
  #modules: Module<Data, unknown>[] = [];

  constructor(module: Module<Data, unknown>) {
    this.#modules.push(module);
  }

  add(module: Module<Data, unknown>): ParallelJob<Data> {
    this.#modules.push(module);
    return this;
  }

  async process(data: Data): Promise<Data> {
    const promises = this.#modules.map((module) => module.process(data));
    await Promise.all(promises);
    return data;
  }
}
