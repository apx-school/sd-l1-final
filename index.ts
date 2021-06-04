import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const obj = minimist(argv);
  return obj;
}

function deteccion(argvParseado) {
  const funciones = new PelisController();
  var resultado;

  if (argvParseado._[0] == "get") {
    const id = argvParseado._[1];
    resultado = funciones.get({ id: id }).then((p) => {
      return p;
    });
  }

  if (argvParseado._[0] == "search") {
    var obj = {};
    if (argvParseado.title) {
      obj = { title: argvParseado.title };
    }
    if (argvParseado.tag) {
      obj = { tag: argvParseado.tag };
    }
    if (argvParseado.title && argvParseado.tag) {
      obj = { title: argvParseado.title, tag: argvParseado.tag };
    }
    resultado = funciones.get({ search: obj }).then((p) => {
      return p;
    });
  }

  if (argvParseado._[0] == "add") {
    var peli = {
      id: argvParseado.id,
      title: argvParseado.title,
      tags: argvParseado.tags,
    };
    resultado = funciones.add(peli).then((p) => {
      return p;
    });
  }

  if (argvParseado._.length == 0) {
    resultado = funciones.get({}).then((p) => {
      return p;
    });
  }
  return resultado;
}

function main() {
  const minimist = parseaParams(process.argv.slice(2));

  deteccion(minimist).then((res) => {
    console.table(res);
  });
}

main();
