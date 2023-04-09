import { Module } from "../module";

export type LoopProps<T> = {
  predicate: Module<T, boolean>;
  module: Module<T, T>;
};

/**
 * Repeatedly process the module while the predicate is true, passing the processed data between iterations.
 */
export class Loop<T> implements Module<T, T> {
  constructor(private props: LoopProps<T>) {}

  async process(data: T) {
    while (await this.props.predicate.process(data)) {
      data = await this.props.module.process(data);
    }
    return data;
  }
}
