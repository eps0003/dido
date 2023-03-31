import { promises as fs } from "fs";
import Module from "../module";

type ReadFileOptions = Parameters<typeof fs["readFile"]>[1];

/**
 * Reads a file from the system and returns the Buffer.
 */
export default class ReadFile<Input> implements Module<Input, string> {
  constructor(
    private fileName: Module<Input, string>,
    private options?: Module<Input, ReadFileOptions>
  ) {}

  async process(data: Input): Promise<string> {
    const fileName = await this.fileName.process(data);
    const options = await this.options?.process(data);
    const file = await fs.readFile(fileName, options);
    return file.toString();
  }
}
