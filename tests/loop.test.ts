import { Literal } from "../modules/literal";
import { Loop } from "../modules/loop";

import { expect } from "chai";
import sinon = require("sinon");
import { Transform } from "../modules/transform";

describe("Loop", () => {
  describe("#process()", () => {
    it("does not process the module if the predicate is false", async () => {
      const module = new Literal("Goodbye, World!");
      const moduleProcess = sinon.spy(module, "process");

      const loop = new Loop({
        predicate: new Literal(false),
        module: module,
      });

      const result = await loop.process("Hello, World!");

      expect(moduleProcess.notCalled, "module not processed").to.be.true;
      expect(result).to.equal("Hello, World!");
    });

    it("processes the module while the predicate is true", async () => {
      const module = new Transform((data: number) => data - 1);
      const moduleProcess = sinon.spy(module, "process");

      const loop = new Loop<number>({
        predicate: new Transform((data) => data > 0),
        module: module,
      });

      await loop.process(3);

      expect(moduleProcess.calledThrice, "module processed thrice").to.be.true;
    });

    it("returns the result of the module when the predicate becomes false", async () => {
      const loop = new Loop<number>({
        predicate: new Transform((data) => data > 0),
        module: new Transform((data) => data - 1),
      });

      const result = await loop.process(3);

      expect(result).to.equal(0);
    });
  });
});
