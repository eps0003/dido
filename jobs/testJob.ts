import IfElse from "../modules/ifElse";
import Literal from "../modules/literal";
import Log from "../modules/log";
import LoopIndex from "../modules/loopIndex";
import Pipe from "../modules/pipe";
import Transform from "../modules/transform";
import Wait from "../modules/wait";

const increment = new Transform<number, number>((data) => data + 1);

export default new IfElse(
  new Literal(false),
  new LoopIndex(
    [new Literal(0), new Literal(10)],
    new Pipe(new Log<number>())
      .next(increment)
      .next(new Wait<number>(new Literal(1)))
  ),
  new Literal(15)
);
