import { promises as fs } from "fs";
import { Module } from "../module";

type WriteFileOptions = Parameters<typeof fs["writeFile"]>[2];

/**
 * Writes a file to the file system, then returns the input.
 */
export class WriteFile<Input> implements Module<Input, Input> {
  constructor(
    private filePath: Module<Input, string>,
    private fileData: Module<Input, string>,
    private options?: Module<Input, WriteFileOptions>
  ) {}

  async process(data: Input): Promise<Input> {
    const [filePath, stringifiedData, options] = await Promise.all([
      this.filePath.process(data),
      this.fileData.process(data),
      this.options?.process(data),
    ]);
    await fs.writeFile(filePath, stringifiedData, options);
    return data;
  }
}
