import { SerialJob } from "../middleware";
import Fork from "../modules/fork";
import numberToBoolean from "../modules/numberToBoolean";
import stringToNumber from "../modules/stringToNumber";

export default new SerialJob(stringToNumber)
  .add(new Fork(numberToBoolean, numberToBoolean))
  .add(numberToBoolean);
