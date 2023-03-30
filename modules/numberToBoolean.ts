import { Transform } from "./transform";

export default new Transform<number, boolean>((data) => {
  return Boolean(data);
});
