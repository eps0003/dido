import { expect } from "chai";
import Flatten from "../modules/flatten";

describe("Flatten", () => {
  describe("#process()", () => {
    it("returns the input array if it is one-dimensional", () => {
      const module = new Flatten();

      const input = [1, 2, 3];

      const result = module.process(input);

      expect(result).to.deep.equal(input);
    });

    it("flattens the input array by one level", () => {
      const module = new Flatten();

      const input = [[[1, 2]], [[3, 4], [5]], 6];

      const result = module.process(input);

      expect(result).to.deep.equal(input.flat());
    });

    it("does not mutate the input", () => {
      const module = new Flatten();

      const input = [[1, 2], [3, 4], 5];
      const inputBefore = [...input];

      module.process(input);

      expect(inputBefore).to.deep.equal(input);
    });
  });
});
