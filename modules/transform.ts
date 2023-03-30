import { Module } from "../middleware";

/**
 * Transforms the input using a transform function.
 */
export class Transform<Input, Output> implements Module<Input, Output> {
  constructor(private transform: (data: Input) => Output | Promise<Output>) {}

  async process(data: Input) {
    return await this.transform(data);
  }
}
