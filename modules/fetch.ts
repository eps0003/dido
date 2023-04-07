import { Module } from "../module";

/**
 * Performs an HTTP request and returns the response object.
 */
export class Fetch<Input extends RequestInfo | URL>
  implements Module<Input, Response>
{
  async process(data: Input): Promise<Response> {
    return await fetch(data);
  }
}
