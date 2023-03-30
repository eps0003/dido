import { Module } from "../middleware";

/**
 * Log the input to the console.
 */
export default class ConsoleLog<T> implements Module<T, T> {
  process(data: T): T {
    console.log(data);
    return data;
  }
}
