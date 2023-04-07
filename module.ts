export type Module<Input, Output> = {
  process(data: Input): Output | Promise<Output>;
};
