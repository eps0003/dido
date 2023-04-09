import { Module } from "../module";

export type TimeOutput<Output> = { data: Output; duration: number };

/**
 * Processes the module and returns result along with how long it took to process in milliseconds.
 */
export class Time<Input, Output> implements Module<Input, TimeOutput<Output>> {
  constructor(private module: Module<Input, Output>) {}

  async process(data: Input): Promise<TimeOutput<Output>> {
    const startTime = Date.now();
    const result = await this.module.process(data);
    return {
      data: result,
      duration: Date.now() - startTime,
    };
  }
}
