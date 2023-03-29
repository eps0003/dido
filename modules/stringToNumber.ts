import { GenericModule } from "../middleware";

export default new GenericModule<string, number>((data) => {
  return parseFloat(data);
});
