import { Literal } from "../modules/literal";
import { Validate, z } from "../modules/validate";

import { expect } from "chai";

describe("Validate", () => {
  describe("#process()", () => {
    it("returns the input if the validation succeeds", async () => {
      const schema = new Literal(z.string());
      const module = new Validate(schema);

      const input = "Hello, World!";

      const result = await module.process(input);

      expect(result).to.equal(input);
    });

    it("throws an error if the validation fails", async () => {
      const schema = new Literal(z.string());
      const module = new Validate(schema);

      const promise = module.process(4);

      return expect(promise).to.be.rejected;
    });
  });
});
