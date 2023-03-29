import testJob from "./jobs/testJob";

async function main() {
  const result = await testJob.process("1.2");
  console.log(result);
}

main();
