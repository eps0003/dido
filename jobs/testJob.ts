import ConsoleLog from "../modules/consoleLog";
import Literal from "../modules/literal";
import LoopIndex from "../modules/loopIndex";
import Sequential from "../modules/sequential";
import Transform from "../modules/transform";
import Wait from "../modules/wait";

const increment = new Transform<number, number>((data) => data + 1);

export default new LoopIndex(
  new Literal(0),
  new Literal(10),
  new Sequential(new ConsoleLog<number>())
    .next(increment)
    .next(new Wait(new Literal(1)))
);
