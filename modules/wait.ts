import { Module } from "../middleware";

/**
 * Waits a specified number of seconds.
 */
export default class Wait<T> implements Module<T, T> {
  constructor(private seconds: Module<T, number>) {}

  async process(data: T): Promise<T> {
    const seconds = await this.seconds.process(data);
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    return data;
  }
}
