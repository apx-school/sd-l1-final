import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  delete resultado._;
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();
  if (params.add) {
    pelisController.add(params.add).then((resultado) => {
      return console.log(resultado);
    });
  }
  if (params.get) {
    pelisController.get(params.get).then((resultado) => {
      return console.log(resultado);
    });
  }
  if (params.search) {
    pelisController.get(params).then((resultado) => {
      return console.log(resultado);
    });
  }
  if (params.vacio) {
    pelisController.get(params).then((resultado) => {
      return console.log(resultado);
    });
  }
}

main();
