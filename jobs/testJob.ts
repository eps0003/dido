import { LoopIndex } from "../modules/loopIndex";
import Literal from "../modules/literal";
import Transform from "../modules/transform";

const increment = new Transform<number, number>((data) => data + 1);

export default new LoopIndex(new Literal(0), new Literal(10), increment);
