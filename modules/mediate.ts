import Module from "../module";
import Pipe from "./pipe";
import Transform from "./transform";

/**
 * Processes a module, then allows the result to be processed alongside the initial input data, usually to merge the two.
 */
export default class Mediate<Input, ModuleOutput, Output>
  implements Module<Input, Output>
{
  constructor(
    private module: Module<Input, ModuleOutput>,
    private mediate: Module<[Input, ModuleOutput], Output>
  ) {}

  async process(data: Input): Promise<Output> {
    return await new Pipe(this.module)
      .next(
        new Transform((moduleData): [Input, ModuleOutput] => {
          return [data, moduleData];
        })
      )
      .next(this.mediate)
      .process(data);
  }
}
