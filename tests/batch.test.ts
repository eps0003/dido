import { expect } from "chai";
import Batch from "../modules/batch";
import Literal from "../modules/literal";
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("Batch", () => {
  describe("#process()", () => {
    it("returns the batched input if batchSize is positive", async () => {
      const batchSize = new Literal(2);
      const module = new Batch<number>(batchSize);

      const result = await module.process([1, 2, 3, 4, 5]);

      expect(result).to.deep.equal([[1, 2], [3, 4], [5]]);
    });

    it("throws an error if batchSize is zero", async () => {
      const batchSize = new Literal(0);
      const module = new Batch<number>(batchSize);

      const promise = module.process([1, 2, 3, 4, 5]);

      return expect(promise).to.be.rejected;
    });

    it("throws an error if batchSize is negative", async () => {
      const batchSize = new Literal(-2);
      const module = new Batch<number>(batchSize);

      const promise = module.process([1, 2, 3, 4, 5]);

      return expect(promise).to.be.rejected;
    });

    it("returns an empty array if the input is an empty array", async () => {
      const batchSize = new Literal(2);
      const module = new Batch<number>(batchSize);

      const result = await module.process([]);

      expect(result).to.deep.equal([]);
    });

    it("batches using the floored batchSize", async () => {
      const batchSize = new Literal(2.5);
      const module = new Batch<number>(batchSize);

      const result = await module.process([1, 2, 3, 4, 5]);

      expect(result).to.deep.equal([[1, 2], [3, 4], [5]]);
    });

    it("does not mutate the input", async () => {
      const batchSize = new Literal(2);
      const module = new Batch<number>(batchSize);

      const input = [1, 2, 3, 4, 5];
      const inputBefore = [...input];

      await module.process(input);

      expect(inputBefore).to.deep.equal(input);
    });
  });
});
