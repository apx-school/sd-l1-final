import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log(resultado);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController();
  var resultado;
  if (params.add) {
    resultado = peliController.add(params);
  } else if (params.get) {
    resultado = peliController.get(params);
  }
  return resultado;
}

main();
