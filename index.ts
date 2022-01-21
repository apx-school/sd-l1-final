import * as minimist from "minimist";
import { PelisCollection, Peli } from "./models";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return {};
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);
}

main();
