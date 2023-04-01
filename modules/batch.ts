import Module from "../module";

/**
 * Splits the input array into batches of a specified size.
 */
export default class Batch<T> implements Module<T[], T[][]> {
  constructor(private batchSize: Module<T[], number>) {}

  async process(data: T[]): Promise<T[][]> {
    const batches: T[][] = [];
    const batchSize = Math.floor(await this.batchSize.process(data));

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      batches.push(batch);
    }

    return batches;
  }
}
