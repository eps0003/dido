import { Batch } from "../modules/batch";
import { Literal } from "../modules/literal";

import { expect } from "chai";
import chai = require("chai");
import chaiAsPromised = require("chai-as-promised");
import sinon = require("sinon");

chai.use(chaiAsPromised);

describe("Batch", () => {
  describe("#process()", () => {
    it("processes batchSize module only once", async () => {
      const batchSize = new Literal(2);
      const batchSizeProcess = sinon.spy(batchSize, "process");

      const module = new Batch(batchSize);
      await module.process([]);

      expect(batchSizeProcess.calledOnce, "processed once").to.be.true;
    });

    it("returns multiple batches if batchSize is less than the number of array elements", async () => {
      const batchSize = new Literal(2);
      const module = new Batch(batchSize);

      const result = await module.process([1, 2, 3, 4, 5]);

      expect(result).to.deep.equal([[1, 2], [3, 4], [5]]);
    });

    it("returns one batch if batchSize is equal to the number of array elements", async () => {
      const batchSize = new Literal(3);
      const module = new Batch(batchSize);

      const result = await module.process([1, 2, 3]);

      expect(result).to.deep.equal([[1, 2, 3]]);
    });

    it("returns one batch if batchSize is greater than the number of array elements", async () => {
      const batchSize = new Literal(5);
      const module = new Batch(batchSize);

      const result = await module.process([1, 2, 3]);

      expect(result).to.deep.equal([[1, 2, 3]]);
    });

    it("throws an error if batchSize is zero", async () => {
      const batchSize = new Literal(0);
      const module = new Batch(batchSize);

      const promise = module.process([1, 2, 3, 4, 5]);

      return expect(promise).to.be.rejected;
    });

    it("throws an error if batchSize is negative", async () => {
      const batchSize = new Literal(-2);
      const module = new Batch(batchSize);

      const promise = module.process([1, 2, 3, 4, 5]);

      return expect(promise).to.be.rejected;
    });

    it("returns an empty array if the input array is empty", async () => {
      const batchSize = new Literal(2);
      const module = new Batch(batchSize);

      const result = await module.process([]);

      expect(result).to.deep.equal([]);
    });

    it("batches using the floored batchSize", async () => {
      const batchSize = new Literal(2.5);
      const module = new Batch(batchSize);

      const result = await module.process([1, 2, 3, 4, 5]);

      expect(result).to.deep.equal([[1, 2], [3, 4], [5]]);
    });

    it("does not mutate the input", async () => {
      const batchSize = new Literal(2);
      const module = new Batch(batchSize);

      const input = [1, 2, 3, 4, 5];
      const inputBefore = [...input];

      await module.process(input);

      expect(inputBefore).to.deep.equal(input);
    });
  });
});
