import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  /*   if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  }
  if (resultado._[0] == "search") {
    if (resultado.title) {
      return { search: { title: resultado.title } };
    }
  } else {
    return {};
  } */

  return resultado;
}

async function processParams(option) {
  const controller = new PelisController();
  if (option._[0] == "add") {
    return await controller
      .add({ id: option.id, title: option.title, tags: option.tags })
      .then((respuesta) => {
        return respuesta;
      });
  }
  if (option._[0] == "search") {
    return await controller.get({
      search: { title: option.title, tag: option.tag },
    });
  }
  if (option._[0] == "get") {
    return await controller.get({ id: option._[1] });
  } else {
    return await controller.get({});
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  processParams(params).then((respuesta) => {
    console.log(respuesta);
  });
}

main();
