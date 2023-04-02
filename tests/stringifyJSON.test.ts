import { expect } from "chai";
import StringifyJSON from "../modules/stringifyJSON";

describe("StringifyJSON", () => {
  describe("#process()", () => {
    it("returns the stringified input", () => {
      const module = new StringifyJSON();

      const input = { hello: "world!" };

      const result = module.process(input);

      expect(result).to.equal(JSON.stringify(input));
    });

    it("throws an error if the input cannot be stringified", () => {
      const module = new StringifyJSON();

      const input = { hello: BigInt(4) };

      const processFunc = module.process.bind(module, input);

      expect(processFunc).to.throw();
    });
  });
});
