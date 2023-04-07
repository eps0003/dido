import Module from "../module";

/**
 * Performs an HTTP request and returns the response object.
 */
export default class Fetch<Input extends RequestInfo | URL>
  implements Module<Input, Response>
{
  async process(data: Input): Promise<Response> {
    return await fetch(data);
  }
}
