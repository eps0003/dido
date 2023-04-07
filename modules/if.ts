import { Module } from "../module";

type TrueProps<T> = {
  predicate: Module<T, boolean>;
  onTrue: Module<T, T>;
  onFalse?: Module<T, T>;
};

type FalseProps<T> = {
  predicate: Module<T, boolean>;
  onTrue?: Module<T, T>;
  onFalse: Module<T, T>;
};

/**
 * Conditionally processes modules depending on the result of the predicate.
 */
export class If<T> implements Module<T, T> {
  constructor(private props: TrueProps<T> | FalseProps<T>) {}

  async process(data: T): Promise<T> {
    if (await this.props.predicate.process(data)) {
      if (this.props.onTrue) {
        return await this.props.onTrue.process(data);
      }
    } else {
      if (this.props.onFalse) {
        return await this.props.onFalse.process(data);
      }
    }
    return data;
  }
}
