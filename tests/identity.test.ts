import { Identity } from "../modules/identity";

import { expect } from "chai";

describe("Identity", () => {
  describe("#process()", () => {
    it("returns the input", () => {
      const module = new Identity<string>();

      const result = module.process("Hello, World!");

      expect(result).to.equal("Hello, World!");
    });
  });
});
