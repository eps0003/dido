import { Branch } from "../modules/branch";
import { Literal } from "../modules/literal";

import { expect } from "chai";
import sinon = require("sinon");

describe("Branch", () => {
  describe("#process()", () => {
    it("returns an array with one result if there is only one module", async () => {
      const branch = new Branch(new Literal(1));

      const result = await branch.process(4);

      expect(result).to.deep.equal([1]);
    });

    it("returns an array with all results if there are multiple modules", async () => {
      const module1 = new Literal(1);
      const module2 = new Literal("hello");
      const module3 = new Literal(true);

      const branch = new Branch(module1).add(module2).add(module3);

      const result = await branch.process(4);

      expect(result).to.deep.equal([1, "hello", true]);
    });

    it("processes each module only once", async () => {
      const module1 = new Literal(1);
      const module2 = new Literal(2);
      const module3 = new Literal(3);

      const module1Process = sinon.spy(module1, "process");
      const module2Process = sinon.spy(module2, "process");
      const module3Process = sinon.spy(module3, "process");

      const branch = new Branch(module1).add(module2).add(module3);

      await branch.process(4);

      expect(module1Process.calledOnce, "module 1 processed once").to.be.true;
      expect(module2Process.calledOnce, "module 2 processed once").to.be.true;
      expect(module3Process.calledOnce, "module 3 processed once").to.be.true;
    });
  });

  describe("#add()", () => {
    it("returns the same module", () => {
      const module1 = new Branch(new Literal(1));
      const module2 = module1.add(new Literal(2));

      expect(module1).to.equal(module2);
    });

    it("does not immediately process the added module", () => {
      const branch = new Branch(new Literal(1));

      const module = new Literal(2);
      const moduleProcess = sinon.spy(module, "process");

      branch.add(module);

      expect(moduleProcess.notCalled).to.be.true;
    });
  });
});
