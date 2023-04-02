import { expect } from "chai";
import Catch from "../modules/catch";
import Literal from "../modules/literal";
import Throw from "../modules/throw";
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Catch", () => {
  describe("#process()", () => {
    it("returns the result of the module if no error was thrown", async () => {
      const doSomething = new Literal("success");
      const handleError = new Literal("handled");

      const module = new Catch(doSomething, handleError);

      const result = await module.process("Hello, World!");

      expect(result).to.equal("success");
    });

    it("returns the result of the error handler if an error was caught", async () => {
      const doSomething = new Throw(new Literal("Error"));
      const handleError = new Literal("handled");

      const module = new Catch(doSomething, handleError);

      const result = await module.process("Hello, World!");

      expect(result).to.equal("handled");
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
