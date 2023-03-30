import Module from "../module";

/**
 *
 */
export default class Batch<T> implements Module<T[], T[][]> {
  constructor(private chunkSize: Module<T[], number>) {}

  async process(data: T[]): Promise<T[][]> {
    const chunks: T[][] = [];
    const chunkSize = Math.floor(await this.chunkSize.process(data));

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      chunks.push(chunk);
    }

    return chunks;
  }
}
