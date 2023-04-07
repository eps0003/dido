import { Module } from "../module";

/**
 * Throws an error.
 */
export class Throw<T> implements Module<T, never> {
  constructor(private error: Module<T, unknown>) {}

  async process(data: T): Promise<never> {
    throw await this.error.process(data);
  }
}
