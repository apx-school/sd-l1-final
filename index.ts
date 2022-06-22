import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

const controllers = new PelisController();
function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = controllers.get(params);
  console.log(resultado);
}

main();
