import minimist from "minimist";
import { PelisController } from "./controllers";
import _ from "lodash";


function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);
}

main();
