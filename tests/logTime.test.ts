import { Identity } from "../modules/identity";
import { Literal } from "../modules/literal";
import { LogTime } from "../modules/logTime";
import { TimeOutput } from "../modules/time";
import { Wait } from "../modules/wait";

import { expect } from "chai";
import sinon = require("sinon");

describe("LogTime", () => {
  let stub: sinon.SinonStub;

  beforeEach(() => {
    stub = sinon.stub(console, "log");
  });

  afterEach(() => {
    stub.restore();
  });

  describe("#process()", () => {
    it("returns the result of the timed module", async () => {
      const logger = new LogTime({
        module: new Literal("Goodbye, World!"),
      });

      const result = await logger.process("Hello, World!");

      expect(result).to.equal("Goodbye, World!");
    });

    it("calls console.log() once", async () => {
      const logger = new LogTime({
        module: new Literal("Goodbye, World!"),
      });

      await logger.process("Hello, World!");

      expect(stub.calledOnce, "called once").to.be.true;
    });

    it("calls console.log() with the result of the value module if specified", async () => {
      const logger = new LogTime({
        module: new Literal("Goodbye, World!"),
        value: new Literal("value"),
      });

      await logger.process("Hello, World!");

      expect(stub.calledOnce, "called once").to.be.true;
      expect(stub.calledWith("value"), "called with provided value").to.be.true;
    });

    it("calls the value module only once with the correct duration in milliseconds", async () => {
      const valueModule = new Identity();
      const valueModuleProcess = sinon.spy(valueModule, "process");

      const logger = new LogTime({
        module: new Wait(new Literal(0.5)),
        value: valueModule,
      });

      await logger.process("Hello, World!");

      expect(valueModuleProcess.calledOnce, "processed once").to.be.true;

      const timeOutput = valueModuleProcess.args[0][0] as TimeOutput<unknown>;
      expect(timeOutput.duration).to.be.gte(500).and.lte(600);
    });
  });
});
