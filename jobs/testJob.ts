import ConsoleLog from "../modules/consoleLog";
import IfElse from "../modules/ifElse";
import Literal from "../modules/literal";
import LoopIndex from "../modules/loopIndex";
import Pipe from "../modules/pipe";
import Transform from "../modules/transform";
import Wait from "../modules/wait";

const increment = new Transform<number, number>((data) => data + 1);

export default new IfElse(
  new Literal(false),
  new LoopIndex(
    [new Literal(0), new Literal(10)],
    new Pipe(new ConsoleLog<number>())
      .next(increment)
      .next(new Wait(new Literal(1)))
  ),
  new Literal(15)
);
