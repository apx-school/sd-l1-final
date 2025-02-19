

import minimist from "minimist";

function parseaParams(argv: string[]): Record<string, any> {
  return minimist(argv);
}



function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);
}

main();
