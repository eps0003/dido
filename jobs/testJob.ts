import { Loop } from "../modules/loop";
import { Transform } from "../modules/transform";

const increment = new Transform<number, number>((data) => data + 1);

export default new Loop(increment, new Transform((data) => data < 1));
