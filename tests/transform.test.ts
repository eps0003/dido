import { expect } from "chai";
import Transform from "../modules/transform";

describe("Transform", () => {
  describe("#process()", () => {
    it("returns the transformed input", async () => {
      const transform = (data: number): number => data * 2;
      const module = new Transform(transform);

      const result = await module.process(2);

      expect(result).to.equal(4);
    });

    it("does not mutate the input", async () => {
      const transform = (data: number[]): number[] => data.reverse();
      const module = new Transform(transform);

      const input = [1, 2, 3];
      const inputBefore = [...input];

      await module.process(input);

      expect(inputBefore).to.deep.equal(input);
    });
  });
});
