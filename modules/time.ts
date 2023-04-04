import Module from "../module";

export type TimeOutput<T> = { data: T; duration: number };

/**
 * Processes the module and returns result along with how long it took to process in milliseconds.
 */
export default class Time<Input, Output>
  implements Module<Input, TimeOutput<Output>>
{
  constructor(private module: Module<Input, Output>) {}

  async process(data: Input): Promise<TimeOutput<Output>> {
    const startTime = new Date().getTime();
    const result = await this.module.process(data);
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    return { data: result, duration };
  }
}
