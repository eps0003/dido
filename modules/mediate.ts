import { Module } from "../module";
import { Pipe } from "./pipe";
import { Transform } from "./transform";

export type MediateProps<Input, ModuleOutput, Output> = {
  module: Module<Input, ModuleOutput>;
  mediator: Module<[inputData: Input, moduleData: ModuleOutput], Output>;
};

/**
 * Processes a module, then allows the result to be processed alongside the initial input data, usually to merge the two.
 */
export class Mediate<Input, ModuleOutput, Output>
  implements Module<Input, Output>
{
  constructor(private props: MediateProps<Input, ModuleOutput, Output>) {}

  async process(data: Input): Promise<Output> {
    return await new Pipe(this.props.module)
      .next(
        new Transform((moduleData): [Input, ModuleOutput] => {
          return [data, moduleData];
        })
      )
      .next(this.props.mediator)
      .process(data);
  }
}
