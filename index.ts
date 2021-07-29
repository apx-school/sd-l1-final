import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { processOptions } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  processOptions(params);
}

main();
