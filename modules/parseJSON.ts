import { Module } from "../module";

/**
 * Parses a JSON string into an object.
 */
export class ParseJSON<T> implements Module<string, T> {
  process(data: string): T {
    return JSON.parse(data) as T;
  }
}
