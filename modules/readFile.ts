import { promises as fs } from "fs";
import { Module } from "../module";

type ReadFileOptions = Parameters<typeof fs["readFile"]>[1];

/**
 * Reads a file from the file system and returns its contents.
 */
export class ReadFile<Input> implements Module<Input, string> {
  constructor(
    private filePath: Module<Input, string>,
    private options?: Module<Input, ReadFileOptions>
  ) {}

  async process(data: Input): Promise<string> {
    const filePath = await this.filePath.process(data);
    const options = await this.options?.process(data);
    const file = await fs.readFile(filePath, options);
    return file.toString();
  }
}
