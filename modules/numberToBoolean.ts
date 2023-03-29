import { GenericModule } from "../middleware";

export default new GenericModule<number, boolean>((data) => {
  return Boolean(data);
});
