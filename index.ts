import * as minimist from "minimist";
import { formatWithOptions } from "node:util";
import { PelisController } from "./controllers";
import { PelisCollection, Peli } from "./models";
function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function Options(peliControl, parametros) {
  if (parametros._[0] == "get") {
    return peliControl.get({ id: parametros._[1] });
  } else if (parametros._[0] == "search") {
    delete parametros._;
    return peliControl.get({ search: parametros });
  } else if (parametros._[0] == "add") {
    delete parametros._;
    return peliControl.add(parametros);
  } else {
    return peliControl.get(false);
  }
}
function main() {
  const params = parseaParams(process.argv.slice(2));
  const controlador = new PelisController();
  Options(controlador, params).then((resultado) => {
    return console.log(resultado);
  });
}

main();
