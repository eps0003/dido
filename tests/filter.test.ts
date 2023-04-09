import { Filter } from "../modules/filter";
import { Transform } from "../modules/transform";

import { expect } from "chai";

describe("Filter", () => {
  describe("#process()", () => {
    it("returns a correctly filtered array based on the result of the predicate", async () => {
      const predicate = new Transform((data: number) => data % 2 === 0);
      const module = new Filter(predicate);

      const result = await module.process([1, 2, 3, 4, 5, 6]);

      expect(result).to.deep.equal([2, 4, 6]);
    });

    it("does not mutate the input", async () => {
      const predicate = new Transform((data: number) => data % 2 === 0);
      const module = new Filter(predicate);

      const input = [1, 2, 3, 4, 5];
      const inputBefore = [...input];

      await module.process(input);

      expect(inputBefore).to.deep.equal(input);
    });
  });
});
