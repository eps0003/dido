import { Module } from "../module";
import { Identity } from "./identity";

/**
 * Logs the result of the module to the console if specified, otherwise, logs the input to the console. The input is returned as output.
 */
export class Log<T> implements Module<T, T> {
  constructor(private value: Module<T, unknown> = new Identity()) {}

  async process(data: T): Promise<T> {
    const value = await this.value.process(data);
    console.log(value);
    return data;
  }
}
