import { promises as fs } from "fs";
import { Module } from "../module";

export type WriteFileProps<Input> = {
  filePath: Module<Input, string>;
  fileData: Module<Input, string>;
  options?: Module<Input, Parameters<typeof fs["writeFile"]>[2]>;
};

/**
 * Writes a file to the file system, then returns the input.
 */
export class WriteFile<Input> implements Module<Input, Input> {
  constructor(private props: WriteFileProps<Input>) {}

  async process(data: Input): Promise<Input> {
    const [filePath, fileData, options] = await Promise.all([
      this.props.filePath.process(data),
      this.props.fileData.process(data),
      this.props.options?.process(data),
    ]);
    await fs.writeFile(filePath, fileData, options);
    return data;
  }
}
