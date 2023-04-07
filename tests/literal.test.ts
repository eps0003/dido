import { Literal } from "../modules/literal";

import { expect } from "chai";

describe("Literal", () => {
  describe("#process()", () => {
    it("returns the specified value", () => {
      const module = new Literal(2);

      const result = module.process(4);

      expect(result).to.equal(2);
    });
  });
});
