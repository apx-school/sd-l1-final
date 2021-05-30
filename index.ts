import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

//Función que conecta los argumentos con el modulo controllers

function processOptions(params, controller) {
  let resultado;

  if (params._[0] == ["add"]) {

    const obj = {
      id: params.id,
      title: params.title,
      tags: params.tags
    };

    resultado = controller.add(obj).then((item) => item);
  }

  if (params._[0] == ["get"]) {
    const obj = { id: params._[1] };

    resultado = controller.get(obj).then((item) => item);
  }

  if (params._[0] == "search") {
    let objeto = {};

    if (params.title) {
      objeto["title"] = params.title;
    }
    if (params.tag) {
      objeto["tag"] = params.tag;
    }

    resultado = controller.get({ search: objeto }).then((result) => {
      console.log({ search: objeto });
      return result;
    });
  }

  if (params._.length == 0) {
    resultado = controller.get({}).then((result) => result);
  }
  return resultado;
}


function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  processOptions(params, controller).then((result) => {
    console.log(result);
  });
}

main();
