import Module from "../module";

/**
 * Performs an HTTP request and returns the response as text.
 */
export default class FetchText<Input extends RequestInfo | URL>
  implements Module<Input, string>
{
  async process(data: Input): Promise<string> {
    return await fetch(data).then((res) => res.text());
  }
}
