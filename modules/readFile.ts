import { promises as fs } from "fs";
import { Module } from "../module";

type ReadFileOptions = Parameters<typeof fs["readFile"]>[1];

/**
 * Reads a file from the file system and returns its contents.
 */
export class ReadFile<Input> implements Module<Input, string> {
  constructor(
    private props: {
      filePath: Module<Input, string>;
      options?: Module<Input, ReadFileOptions>;
    }
  ) {}

  async process(data: Input): Promise<string> {
    const [filePath, options] = await Promise.all([
      this.props.filePath.process(data),
      this.props.options?.process(data),
    ]);
    const file = await fs.readFile(filePath, options);
    return file.toString();
  }
}
