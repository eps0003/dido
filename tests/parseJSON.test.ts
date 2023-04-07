import { ParseJSON } from "../modules/parseJSON";

import { expect } from "chai";

describe("ParseJSON", () => {
  describe("#process()", () => {
    it("returns the parsed input", () => {
      const module = new ParseJSON();

      const input = '{"hello":"world!"}';

      const result = module.process(input);

      expect(result).to.deep.equal(JSON.parse(input));
    });

    it("throws an error if the input cannot be parsed", () => {
      const module = new ParseJSON();

      const input = '{"hello":"world!"';

      const processFunc = module.process.bind(module, input);

      expect(processFunc).to.throw();
    });
  });
});
