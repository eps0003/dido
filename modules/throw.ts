import Module from "../module";

/**
 * Throws an error.
 */
export default class Throw<T> implements Module<T, never> {
  constructor(private error: Module<T, string | Error>) {}

  async process(data: T): Promise<never> {
    const error = await this.error.process(data);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
}
