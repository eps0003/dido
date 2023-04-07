import { Module } from "../module";
import { If } from "../modules/if";
import { Literal } from "../modules/literal";
import { Log } from "../modules/log";
import { LoopIndex } from "../modules/loopIndex";
import { Pipe } from "../modules/pipe";
import { Transform } from "../modules/transform";
import { Wait } from "../modules/wait";

export const TestJob: Module<number, number> = new If<number>(new Literal(true))
  .onTrue(
    new LoopIndex(
      [new Literal(0), new Literal(10)],
      new Pipe(new Log<number>())
        .next(new Transform((data) => data + 1))
        .next(new Wait<number>(new Literal(1)))
    )
  )
  .onFalse(new Literal(15));
