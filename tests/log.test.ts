import { expect } from "chai";
import Log from "../modules/log";
import sinon = require("sinon");
import Literal from "../modules/literal";

describe("Log", () => {
  let stub: sinon.SinonStub;

  beforeEach(() => {
    stub = sinon.stub(console, "log");
  });

  afterEach(() => {
    stub.restore();
  });

  describe("#process()", () => {
    it("returns the input", async () => {
      const logger = new Log(new Literal("Goodbye, World!"));

      const result = await logger.process("Hello, World!");

      expect(result).to.equal("Hello, World!");
    });

    it("calls console.log() once with the input if no module is specified", async () => {
      const logger = new Log();

      const input = "Hello, World!";

      await logger.process(input);

      expect(stub.calledOnce, "called once").to.be.true;
      expect(stub.calledWith(input), "called with input").to.be.true;
    });

    it("calls console.log() once with the result of the module if specified", async () => {
      const logger = new Log(new Literal("Goodbye, World!"));

      await logger.process("Hello, World!");

      expect(stub.calledOnce, "called once").to.be.true;
      expect(stub.calledWith("Goodbye, World!"), "called with input").to.be
        .true;
    });
  });
});
