import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function getOption(controller, params) {
  var parametros;
  if (params._[0] == "add") {
    let peli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    return (parametros = controller.add(peli).then((e) => {
      return e;
    }));
  }
  if (params._[0] == "get") {
    return (parametros = controller
      .get({ id: params._[1] })
      .then((respuesta) => {
        return respuesta;
      }));
  }
  if (params._[0] == "search") {
    let opc = {};
    if (params.title) {
      opc["title"] = params.title;
    }
    if (params.tag) {
      opc["tag"] == params.tag;
    }
    return (parametros = controller.get({ search: opc }).then((i) => {
      return i;
    }));
  }
  if (params._.length == 0) {
    return (parametros = controller.get({}).then((e) => {
      return e;
    }));
  }
  return parametros;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  getOption(controller, params).then((r) => {
    console.log(r);
  });
}

main();
