import { Module } from "../module";

/**
 * Parses a JSON string into an object.
 */
export class ParseJSON implements Module<string, unknown> {
  process(data: string): unknown {
    return JSON.parse(data);
  }
}
