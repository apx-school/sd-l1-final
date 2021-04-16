import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  let aux: {} = {};
  let propiedad: {} = {};

  if (resultado._[0] == "search") {
    for (const key in resultado) {
      if (key != "_") {
        aux[key] = resultado[key];
      }
    }
    propiedad = { search: aux };
  }
  if (resultado._[0] == "get") {
    propiedad = { id: resultado._[1] };
  }
  if (resultado._[0] == "add") {
    for (const key in resultado) {
      if (key != "_") aux[key] = resultado[key];
    }
    propiedad = { add: aux };
  }

  return propiedad;
}

function main() {
  const controller = new PelisController();
  controller.promesaController.then(() => {
    const params = parseaParams(process.argv.slice(2));
    controller.get(params).then((n) => {
      return n;
    });
  });
}

main();
