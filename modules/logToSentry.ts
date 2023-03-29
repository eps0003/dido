import { GenericModule } from "../middleware";

export default new GenericModule((error) => {
  console.log("log sentry:", String(error));
  return error;
});
