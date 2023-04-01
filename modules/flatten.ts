import Module from "../module";

type FlatArray<Input> = (Input extends readonly (infer InnerArr)[]
  ? InnerArr extends readonly (infer InnerArr)[]
    ? InnerArr
    : InnerArr
  : Input)[];

/**
 * Flatten a multi-dimensional array by one dimension.
 *
 * For example, a three-dimensional array will flatten to two dimensions.
 */
export default class Flatten<Input extends unknown[]>
  implements Module<Input, FlatArray<Input>>
{
  async process(data: Input): Promise<FlatArray<Input>> {
    return data.flat();
  }
}
