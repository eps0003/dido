export type Module<Input, Output> = {
  process(data: Input): Output | Promise<Output>;
};

export type InputType<T extends Module<unknown, unknown>> = T extends Module<
  infer Input,
  unknown
>
  ? Input
  : never;

export type OutputType<T extends Module<unknown, unknown>> = T extends Module<
  unknown,
  infer Output
>
  ? Output
  : never;
