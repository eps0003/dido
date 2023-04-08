import { Module } from "../module";
import { MapAsync } from "./mapAsync";

/**
 * Returns the elements of the input array based on the result of the predicate.
 */
export class Filter<T> implements Module<T[], T[]> {
  constructor(private predicate: Module<T, boolean>) {}

  async process(data: T[]): Promise<T[]> {
    const results = await new MapAsync(this.predicate).process(data);
    return data.filter((value, index) => results[index]);
  }
}
