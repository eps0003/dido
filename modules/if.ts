import Module from "../module";
import Literal from "./literal";

/**
 * Conditionally processes modules depending on the result of the predicate.
 */
export default class If<T> implements Module<T, T> {
  private trueModule?: Module<T, T>;
  private falseModule?: Module<T, T>;

  constructor(private predicate: Module<T, boolean>) {}

  onTrue(module: Module<T, T>): this {
    this.trueModule = module;
    return this;
  }

  onFalse(module: Module<T, T>): this {
    this.falseModule = module;
    return this;
  }

  async process(data: T): Promise<T> {
    if (await this.predicate.process(data)) {
      if (this.trueModule) {
        return await this.trueModule.process(data);
      }
    } else {
      if (this.falseModule) {
        return await this.falseModule.process(data);
      }
    }
    return data;
  }
}

new If(new Literal(true)).onTrue(new Literal("hi")).onFalse(new Literal("bye"));
