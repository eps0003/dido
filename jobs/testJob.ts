import { LoopIndex } from "../modules/loopIndex";
import Literal from "../modules/literal";
import Transform from "../modules/transform";
import { SerialJob } from "../middleware";
import Wait from "../modules/wait";
import ConsoleLog from "../modules/consoleLog";
import Conditional from "../modules/conditional";

const increment = new Transform<number, number>((data) => data + 1);

export default new LoopIndex(
  new Literal(0),
  new Literal(10),
  new SerialJob(new ConsoleLog<number>())
    .pipe(increment)
    .pipe(new Wait(new Literal(1)))
);
