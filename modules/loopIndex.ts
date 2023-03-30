import { Module } from "../middleware";

/**
 *
 */
export class LoopIndex<T> implements Module<T, T> {
  constructor(
    private startIndex: Module<T, number>,
    private endIndex: Module<T, number>,
    private module: Module<T, T>
  ) {}

  async process(data: T) {
    for (
      let i = await this.startIndex.process(data);
      i < (await this.endIndex.process(data));
      i++
    ) {
      data = await this.module.process(data);
    }
    return data;
  }
}
