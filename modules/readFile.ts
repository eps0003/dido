import { promises as fs } from "fs";
import { Module } from "../module";

export type ReadFileProps<Input> = {
  filePath: Module<Input, string>;
  options?: Module<Input, Parameters<typeof fs["readFile"]>[1]>;
};

/**
 * Reads a file from the file system and returns its contents.
 */
export class ReadFile<Input> implements Module<Input, string> {
  constructor(private props: ReadFileProps<Input>) {}

  async process(data: Input): Promise<string> {
    const [filePath, options] = await Promise.all([
      this.props.filePath.process(data),
      this.props.options?.process(data),
    ]);
    const file = await fs.readFile(filePath, options);
    return file.toString();
  }
}
