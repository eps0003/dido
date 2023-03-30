import { Transform } from "./transform";

export default new Transform<string, number>((data) => {
  return parseFloat(data);
});
