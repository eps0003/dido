import { Module } from "../module";
import { Time, TimeOutput } from "./time";

export type LogTimeProps<Input, Output> = {
  module: Module<Input, Output>;
  value?: Module<TimeOutput<Output>, unknown>;
};

/**
 * Processes the module and logs how long it took to process when finished, then returns the result of the module.
 */
export class LogTime<Input, Output> implements Module<Input, Output> {
  constructor(private props: LogTimeProps<Input, Output>) {}

  async process(data: Input): Promise<Output> {
    const result = await new Time(this.props.module).process(data);
    const value =
      (await this.props.value?.process(result)) ??
      `${(result.duration / 1000).toFixed(3)} seconds`;

    console.log(value);

    return result.data;
  }
}
