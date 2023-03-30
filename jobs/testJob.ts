import { SerialJob } from "../middleware";
import Conditional from "../modules/conditional";
import Literal from "../modules/literal";
import Transform from "../modules/transform";

const increment = new Transform<number, number>((data) => data + 1);

export default new Conditional(
  new Literal(true),
  new SerialJob(increment)
    .pipe(increment)
    .pipe(increment)
    .pipe(increment)
    .pipe(increment)
    .pipe(increment)
);
