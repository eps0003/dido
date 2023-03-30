export default interface Module<Input, Output> {
  process: (data: Input) => Output | Promise<Output>;
}
