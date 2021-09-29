import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  const resultadoMinimist = minimist(argv)
  return resultadoMinimist
};

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params)
  const instancia = new PelisController()
};
main();

