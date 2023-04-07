import Module from "../module";

/**
 * Performs an HTTP request and returns the response as JSON.
 */
export default class FetchJSON<Input extends RequestInfo | URL>
  implements Module<Input, unknown>
{
  async process(data: Input): Promise<unknown> {
    return await fetch(data).then((res) => res.json());
  }
}
