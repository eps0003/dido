import { expect } from "chai";
import Catch from "../modules/catch";
import Literal from "../modules/literal";
import Throw from "../modules/throw";
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import sinon = require("sinon");

chai.use(chaiAsPromised);

describe("Catch", () => {
  describe("#process()", () => {
    it("returns the result of the module if no error was thrown", async () => {
      const throwError = new Literal("success");
      const handleError = new Literal("handled");

      const throwErrorProcess = sinon.spy(throwError, "process");
      const handleErrorProcess = sinon.spy(handleError, "process");

      const module = new Catch(throwError, handleError);

      const result = await module.process("Hello, World!");

      expect(result).to.equal("success");
      expect(throwErrorProcess.calledOnce, "module processed").to.be.true;
      expect(handleErrorProcess.notCalled, "handler not processed").to.be.true;
    });

    it("returns the result of the error handler if an error was caught", async () => {
      const throwError = new Throw(new Literal("Error"));
      const handleError = new Literal("handled");

      const throwErrorProcess = sinon.spy(throwError, "process");
      const handleErrorProcess = sinon.spy(handleError, "process");

      const module = new Catch(throwError, handleError);

      const result = await module.process("Hello, World!");

      expect(result).to.equal("handled");
      expect(throwErrorProcess.calledOnce, "module processed").to.be.true;
      expect(handleErrorProcess.calledOnce, "handler processed").to.be.true;
    });

    it("does not catch errors thrown by the error handler", () => {
      const doSomething = new Throw(new Literal("Error 1"));
      const handleError = new Throw(new Literal("Error 2"));

      const module = new Catch(doSomething, handleError);

      const promise = module.process("Hello, World!");

      return expect(promise).to.be.rejectedWith("Error 2");
    });
  });
});
