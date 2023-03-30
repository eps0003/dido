import Module from "../module";

/**
 * Converts the input into a JSON string.
 */
export default class StringifyJSON implements Module<unknown, string> {
  process(data: unknown): string {
    return JSON.stringify(data);
  }
}
