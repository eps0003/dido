import { expect } from "chai";
import ConsoleLog from "../modules/consoleLog";
import sinon = require("sinon");

describe("ConsoleLog", () => {
  let stub: sinon.SinonStub;

  beforeEach(() => {
    stub = sinon.stub(console, "log");
  });

  afterEach(() => {
    stub.restore();
  });

  describe("#process()", () => {
    it("returns the input", () => {
      const module = new ConsoleLog<string>();

      const result = module.process("Hello, World!");

      expect(result).to.equal("Hello, World!");
    });

    it("calls console.log() once with the input", () => {
      const module = new ConsoleLog<string>();

      const input = "Hello, World!";

      module.process(input);

      expect(stub.calledOnce, "called once").to.be.true;
      expect(stub.calledWith(input), "called with input").to.be.true;
    });
  });
});
