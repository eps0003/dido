import Module from "../module";

type TimedOutput<Output> = {
  data: Output;
  durationMs: number;
};

/**
 * Returns how long a module took to process.
 */
export default class Time<Input, Output>
  implements Module<Input, TimedOutput<Output>>
{
  constructor(private module: Module<Input, Output>) {}

  async process(data: Input): Promise<TimedOutput<Output>> {
    const startTime = new Date().getTime();
    const result = await this.module.process(data);
    const endTime = new Date().getTime();
    return {
      data: result,
      durationMs: endTime - startTime,
    };
  }
}
