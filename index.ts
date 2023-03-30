import testJob from "./jobs/testJob";

async function main() {
  const result = await testJob.process(0);
  console.log(result);
}

main();
