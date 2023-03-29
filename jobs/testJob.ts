import { ParallelJob, SerialJob } from "../middleware";
import numberToBoolean from "../modules/numberToBoolean";
import stringToNumber from "../modules/stringToNumber";

export default new SerialJob(stringToNumber)
  .add(new ParallelJob(numberToBoolean).add(numberToBoolean))
  .add(numberToBoolean);
