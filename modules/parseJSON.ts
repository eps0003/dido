import { Module } from "../middleware";

/**
 * Parses a JSON string into an object.
 */
export default class ParseJSON<T> implements Module<string, T> {
  process(data: string): T {
    return JSON.parse(data) as T;
  }
}
