import { expect } from "chai";
import IfElse from "../modules/ifElse";
import Literal from "../modules/literal";

describe("IfElse", () => {
  describe("#process()", () => {
    it("returns the result of trueModule if if the predicate is true", async () => {
      const predicate = new Literal(true);
      const trueModule = new Literal(2);
      const falseModule = new Literal(6);

      const module = new IfElse(predicate, trueModule, falseModule);

      const result = await module.process(4);

      expect(result).to.equal(2);
    });

    it("returns the result of falseModule if if the predicate is false", async () => {
      const predicate = new Literal(false);
      const trueModule = new Literal(2);
      const falseModule = new Literal(6);

      const module = new IfElse(predicate, trueModule, falseModule);

      const result = await module.process(4);

      expect(result).to.equal(6);
    });
  });
});
