import { expect } from "chai";
import IfElse from "../modules/ifElse";
import Literal from "../modules/literal";
import sinon = require("sinon");

describe("IfElse", () => {
  describe("#process()", () => {
    it("returns the result of trueModule if the predicate is true", async () => {
      const predicate = new Literal(true);
      const trueModule = new Literal(2);
      const falseModule = new Literal(6);

      const trueModuleProcess = sinon.spy(trueModule, "process");
      const falseModuleProcess = sinon.spy(falseModule, "process");

      const module = new IfElse(predicate, trueModule, falseModule);

      const result = await module.process(4);

      expect(result).to.equal(2);
      expect(trueModuleProcess.calledOnce, "trueModule processed once").to.be
        .true;
      expect(falseModuleProcess.notCalled, "falseModule not processed").to.be
        .true;
    });

    it("returns the result of falseModule if the predicate is false", async () => {
      const predicate = new Literal(false);
      const trueModule = new Literal(2);
      const falseModule = new Literal(6);

      const trueModuleProcess = sinon.spy(trueModule, "process");
      const falseModuleProcess = sinon.spy(falseModule, "process");

      const module = new IfElse(predicate, trueModule, falseModule);

      const result = await module.process(4);

      expect(result).to.equal(6);
      expect(trueModuleProcess.notCalled, "trueModule not processed").to.be
        .true;
      expect(falseModuleProcess.calledOnce, "falseModule processed").to.be.true;
    });
  });
});
