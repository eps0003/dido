import { expect } from "chai";
import Identity from "../modules/identity";

describe("Identity", () => {
  describe("#process()", () => {
    it("returns the input", () => {
      const module = new Identity<string>();

      const result = module.process("Hello, World!");

      expect(result).to.equal("Hello, World!");
    });
  });
});
