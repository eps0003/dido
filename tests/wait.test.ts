import { expect } from "chai";
import Literal from "../modules/literal";
import Wait from "../modules/wait";

describe("Wait", () => {
  describe("#process()", () => {
    it("returns the input", async () => {
      const seconds = new Literal(0);
      const module = new Wait(seconds);

      const result = await module.process(4);

      expect(result).to.equal(4);
    });

    it("waits for the specified number of seconds", async () => {
      const seconds = new Literal(0.5);
      const module = new Wait(seconds);

      const startTime = new Date().getTime();

      await module.process(4);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;

      expect(duration).to.be.gte(500).and.lte(600);
    });
  });
});
