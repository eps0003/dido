import { If } from "../modules/if";
import { Literal } from "../modules/literal";

import { expect } from "chai";
import sinon = require("sinon");

describe("If", () => {
  describe("#process()", () => {
    it("returns the result of onTrue module if the predicate is true", async () => {
      const predicate = new Literal(true);
      const trueModule = new Literal(2);
      const falseModule = new Literal(6);

      const trueModuleProcess = sinon.spy(trueModule, "process");
      const falseModuleProcess = sinon.spy(falseModule, "process");

      const module = new If({
        predicate: predicate,
        onTrue: trueModule,
        onFalse: falseModule,
      });

      const result = await module.process(4);

      expect(result).to.equal(2);
      expect(trueModuleProcess.calledOnce, "onTrue module processed once").to.be
        .true;
      expect(falseModuleProcess.notCalled, "onFalse module not processed").to.be
        .true;
    });

    it("returns the result of onFalse module if the predicate is false", async () => {
      const predicate = new Literal(false);
      const trueModule = new Literal(2);
      const falseModule = new Literal(6);

      const trueModuleProcess = sinon.spy(trueModule, "process");
      const falseModuleProcess = sinon.spy(falseModule, "process");

      const module = new If({
        predicate: predicate,
        onTrue: trueModule,
        onFalse: falseModule,
      });

      const result = await module.process(4);

      expect(result).to.equal(6);
      expect(trueModuleProcess.notCalled, "onTrue module not processed").to.be
        .true;
      expect(falseModuleProcess.calledOnce, "onFalse module processed").to.be
        .true;
    });

    it("returns the input if predicate is true but no onTrue module is provided", async () => {
      const predicate = new Literal(true);
      const falseModule = new Literal(6);

      const falseModuleProcess = sinon.spy(falseModule, "process");

      const module = new If({
        predicate: predicate,
        onFalse: falseModule,
      });

      const result = await module.process(4);

      expect(result).to.equal(4);
      expect(falseModuleProcess.notCalled, "onFalse module not processed").to.be
        .true;
    });

    it("returns the input if predicate is false but no onFalse module is provided", async () => {
      const predicate = new Literal(false);
      const trueModule = new Literal(2);

      const trueModuleProcess = sinon.spy(trueModule, "process");

      const module = new If({
        predicate: predicate,
        onTrue: trueModule,
      });

      const result = await module.process(4);

      expect(result).to.equal(4);
      expect(trueModuleProcess.notCalled, "onTrue module not processed").to.be
        .true;
    });
  });
});
