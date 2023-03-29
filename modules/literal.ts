import { Module } from "../middleware";

/**
 * Returns the value provided, discarding the input.
 */
export default class Literal<T> implements Module<unknown, T> {
  constructor(private value: T) {}

  process(): T {
    return this.value;
  }
}
