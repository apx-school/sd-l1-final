import * as minimist from "minimist";
import * as has from "lodash/has";
import * as isEmpty from "lodash/isEmpty";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function options(result) {
  const controller = new PelisController();
  if (result._[0] == "get") {
    const getValue = result._[1];
    return controller.get({ id: getValue }).then((p) => {
      if (isEmpty(p)) {
        return "No existe una pelicula con ese id";
      } else {
        return p;
      }
    });
  }
  if (result._[0] == "add") {
    let objectAdd = {
      id: result.id,
      title: result.title,
      tags: result.tags,
    };
    return controller.add(objectAdd).then((p) => {
      if (p) {
        return "La pelicula se agregó con exito";
      } else {
        return "La pelicula no se guardó, intente ingresando con un id diferente";
      }
    });
  }
  if (result._[0] == "search") {
    let objectSearch = {};
    if (has(result, "tag")) {
      objectSearch = {
        search: {
          tag: result.tag,
        },
      };
    }
    if (has(result, "title")) {
      objectSearch = {
        search: {
          title: result.title,
        },
      };
    }
    if (has(result, "title") && has(result, "tag")) {
      objectSearch = {
        search: {
          title: result.title,
          tag: result.tag,
        },
      };
    }
    return controller.get(objectSearch).then((p) => {
      if (isEmpty(p)) {
        return "No hay peliculas que coincidan con su busqueda";
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
