import { expect } from "chai";
import Branch from "../modules/branch";
import Literal from "../modules/literal";

describe("Branch", () => {
  describe("#process()", () => {
    it("returns an array with one result if there is only one branch", async () => {
      const module = new Branch(new Literal(1));

      const result = await module.process(4);

      expect(result).to.deep.equal([1]);
    });

    it("returns an array with all results if there are multiple branches", async () => {
      const branch1 = new Literal(1);
      const branch2 = new Literal("hello");
      const branch3 = new Literal(true);

      const module = new Branch(branch1).add(branch2).add(branch3);

      const result = await module.process(4);

      expect(result).to.deep.equal([1, "hello", true]);
    });
  });

  describe("#add()", () => {
    it("returns the same module", () => {
      const module1 = new Branch(new Literal(2));
      const module2 = module1.add(new Literal(4));

      expect(module1).to.equal(module2);
    });
  });
});
