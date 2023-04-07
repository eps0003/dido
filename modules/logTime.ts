import { Module } from "../module";
import { Time, TimeOutput } from "./time";
import { Transform } from "./transform";

function getDefaultValue<T>(): Module<TimeOutput<T>, unknown> {
  return new Transform(({ duration }) => {
    return `${(duration / 1000).toFixed(3)} seconds`;
  });
}

/**
 * Processes the module and logs how long it took to process when finished, then returns the result of the module.
 */
export class LogTime<Input, Output> implements Module<Input, Output> {
  constructor(
    private module: Module<Input, Output>,
    private value: Module<TimeOutput<Output>, unknown> = getDefaultValue()
  ) {}

  async process(data: Input): Promise<Output> {
    const result = await new Time(this.module).process(data);
    const value = await this.value.process(result);

    console.log(value);

    return result.data;
  }
}
