import { expect } from "chai";
import Fork from "../modules/fork";
import Literal from "../modules/literal";
import sinon = require("sinon");

describe("Fork", () => {
  describe("#process()", () => {
    it("returns the input", async () => {
      const module = new Fork(new Literal(1)).add(new Literal(2));

      const result = await module.process(4);

      expect(result).to.equal(4);
    });

    it("processes each module only once", async () => {
      const module1 = new Literal(1);
      const module2 = new Literal(2);
      const module3 = new Literal(3);
      const module4 = new Literal(4);

      const module1Process = sinon.spy(module1, "process");
      const module2Process = sinon.spy(module2, "process");
      const module3Process = sinon.spy(module3, "process");
      const module4Process = sinon.spy(module4, "process");

      const fork = new Fork(module1, module2).add(module3).add(module4);

      await fork.process(4);

      expect(module1Process.calledOnce, "module 1 processed once").to.be.true;
      expect(module2Process.calledOnce, "module 2 processed once").to.be.true;
      expect(module3Process.calledOnce, "module 3 processed once").to.be.true;
      expect(module4Process.calledOnce, "module 4 processed once").to.be.true;
    });
  });

  describe("#add()", () => {
    it("returns the same module", () => {
      const module1 = new Fork(new Literal(2));
      const module2 = module1.add(new Literal(4));

      expect(module1).to.equal(module2);
    });

    it("does not immediately process the added module", () => {
      const fork = new Fork(new Literal(1));

      const module = new Literal(2);
      const moduleProcess = sinon.spy(module, "process");

      fork.add(module);

      expect(moduleProcess.notCalled).to.be.true;
    });
  });
});
