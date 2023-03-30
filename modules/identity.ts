import { Module } from "../middleware";

/**
 * Returns the input as output.
 */
export default class Identity<T> implements Module<T, T> {
  process(data: T): T {
    return data;
  }
}
