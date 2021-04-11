import * as minimist from "minimist";
import * as isEmpty from "lodash/isEmpty";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function options(result) {
  const controller = new PelisController();
  if (result._ == "add") {
    delete result._;
    return controller.add(result).then((p) => {
      if (p) {
        return "La pelicula se agrego correctamente";
      } else {
        return "La pelicula no se pudo agregar correctamente, intente con otro id";
      }
    });
  }
  if (result._[0] == "get") {
    const idParam = result._[1];
    return controller.get({ id: idParam }).then((p) => {
      if (p) {
        return p;
      } else {
        return "No se encontro ninguna pelicula con el id ingresado";
      }
    });
  }
  if (result._ == "search") {
    delete result._;
    return controller.get({ search: result }).then((p) => {
      if (isEmpty(p)) {
        return "No se encontro ninguna pelicula en base a su busqueda";
      } else {
        return p;
      }
    });
  } else {
    return controller.get({}).then((p) => {
      return p;
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
