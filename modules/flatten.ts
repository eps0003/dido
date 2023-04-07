import { Module } from "../module";

type FlatArray<T> = (T extends readonly (infer InnerArr)[]
  ? InnerArr extends readonly (infer InnerArr)[]
    ? InnerArr
    : InnerArr
  : T)[];

/**
 * Flatten a multi-dimensional array by one level.
 *
 * For example, a three-dimensional array will flatten to two dimensions.
 */
export class Flatten<T extends unknown[]> implements Module<T, FlatArray<T>> {
  process(data: T): FlatArray<T> {
    return data.flat();
  }
}
