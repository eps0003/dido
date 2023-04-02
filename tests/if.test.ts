import { expect } from "chai";
import If from "../modules/if";
import Literal from "../modules/literal";

describe("If", () => {
  describe("#process()", () => {
    it("returns the result of the module if the predicate is true", async () => {
      const predicate = new Literal(true);
      const trueModule = new Literal(2);

      const module = new If(predicate, trueModule);

      const result = await module.process(4);

      expect(result).to.equal(2);
    });

    it("returns the input if the predicate is false", async () => {
      const predicate = new Literal(false);
      const trueModule = new Literal(2);

      const module = new If(predicate, trueModule);

      const result = await module.process(4);

      expect(result).to.equal(4);
    });
  });
});
