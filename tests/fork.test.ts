import { expect } from "chai";
import Fork from "../modules/fork";
import Literal from "../modules/literal";
import sinon = require("sinon");

describe("Fork", () => {
  describe("#process()", () => {
    it("returns the input", async () => {
      const module = new Fork(new Literal(1));

      const result = await module.process(4);

      expect(result).to.equal(4);
    });

    it("processes all modules passed into the constructor", async () => {
      const fork1 = new Literal(1);
      const fork2 = new Literal(2);
      const fork3 = new Literal(3);

      const fork1Process = sinon.stub(fork1, "process");
      const fork2Process = sinon.stub(fork2, "process");
      const fork3Process = sinon.stub(fork3, "process");

      const module = new Fork(fork1, fork2, fork3);

      await module.process(4);

      expect(fork1Process.calledOnce).to.be.true;
      expect(fork2Process.calledOnce).to.be.true;
      expect(fork3Process.calledOnce).to.be.true;
    });

    it("processes modules added via #add()", async () => {
      const fork = new Literal(1);
      const module = new Fork().add(fork);

      const forkProcess = sinon.stub(fork, "process");

      await module.process(4);

      expect(forkProcess.calledOnce).to.be.true;
    });
  });

  describe("#add()", () => {
    it("returns the same module", () => {
      const module1 = new Fork(new Literal(2));
      const module2 = module1.add(new Literal(4));

      expect(module1).to.equal(module2);
    });
  });
});
