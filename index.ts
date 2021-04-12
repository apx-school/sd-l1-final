import * as minimist from "minimist";
import * as isEmpty from "lodash/isEmpty";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function options(result) {
  const controller = new PelisController();
  const resultado = result._[0];
  if (resultado != "add") {
    var params = {};
    if (resultado == "get") {
      params = { id: result._[1] };
    }
    if (resultado == "search") {
      delete result._;
      params = { search: result };
    }
    return controller.get(params).then((p) => {
      if (isEmpty(p)) {
        return "No se encontraron peliculas en base a su busqueda";
      } else {
        return p;
      }
    });
  } else {
    delete result._;
    return controller.add(result).then((p) => {
      return p
        ? "Se agrego correctamente la pelicula"
        : "No se agrego la pelicula, intente con otro id o ingrese todos los campos";
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultOptions = options(params);
  resultOptions.then((result) => {
    console.log(result);
  });
}

main();
