import { Module } from "../module";

/**
 * Returns the value provided, discarding the input.
 */
export class Literal<T> implements Module<unknown, T> {
  constructor(private value: T) {}

  process(data: unknown): T {
    return this.value;
  }
}
