import Conditional from "../modules/conditional";
import Literal from "../modules/literal";
import Transform from "../modules/transform";

const increment = new Transform<number, number>((data) => data + 1);

export default new Conditional(increment, new Literal(true));
