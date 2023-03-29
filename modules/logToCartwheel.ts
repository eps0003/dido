import { GenericModule } from "../middleware";

export default new GenericModule((error) => {
  console.log("log cartwheel:", String(error));
  return error;
});
