import { Literal } from "../modules/literal";
import { Mediate } from "../modules/mediate";
import { Transform } from "../modules/transform";

import { expect } from "chai";
import sinon = require("sinon");

describe("Mediate", () => {
  describe("#process()", () => {
    it("returns the mediated data", async () => {
      const module = new Literal("World");
      const mediate = new Transform<[string, string], string>(([a, b]) => {
        return `${a}, ${b}!`;
      });

      const mediator = new Mediate({
        module: module,
        mediator: mediate,
      });

      const result = await mediator.process("Hello");

      expect(result).to.equal("Hello, World!");
    });

    it("processes the modules only once", async () => {
      const module = new Literal(1);
      const mediate = new Literal(1);

      const moduleProcess = sinon.stub(module, "process");
      const mediateProcess = sinon.stub(mediate, "process");

      const mediator = new Mediate({
        module: module,
        mediator: mediate,
      });

      await mediator.process(1);

      expect(moduleProcess.calledOnce, "module processed once").to.be.true;
      expect(mediateProcess.calledOnce, "mediator processed once").to.be.true;
    });
  });
});
