import { expect } from "chai";
import Literal from "../modules/literal";

describe("Literal", () => {
  describe("#process()", () => {
    it("returns the specified value", () => {
      const module = new Literal(2);

      const result = module.process(4);

      expect(result).to.equal(2);
    });
  });
});
