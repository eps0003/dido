import { TestJob } from "./jobs/testJob";

async function main() {
  const result = await TestJob.process(0);
  console.log(result);
}

main();
