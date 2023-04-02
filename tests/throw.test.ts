import { expect } from "chai";
import Throw from "../modules/throw";
import Literal from "../modules/literal";

describe("Throw", () => {
  describe("#process()", () => {
    it("throws an error with the correct error message", () => {
      const errorMessage = "uh oh!";
      const error = new Literal(errorMessage);
      const module = new Throw(error);

      const promise = module.process("Hello, World!");

      return expect(promise).to.be.rejectedWith(errorMessage);
    });
  });
});
