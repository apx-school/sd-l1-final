import * as minimist from "minimist";
import { PelisController } from "./controllers";

function comandos(params) {
  const controller = new PelisController();
  if (params.title && params.tag && params.id) {
    return controller.add(params).then((respuesta) => {
      return respuesta;
    });
  } else if (params.id) {
    return controller.get(params).then((respuesta) => {
      return respuesta;
    });
  } else if (params.search) {
    return controller.get(params).then((respuesta) => {
      return respuesta;
    });
  } else {
    return controller.get({}).then((respuesta) => {
      return respuesta;
    });
  }
}
function parseaparams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "serach" && resultado.tag) {
    return { serach: { tag: resultado.tag } };
  } else {
    return {};
  }
}

function main() {
  const params = parseaparams(process.argv.slice(2));
  comandos(params).then((respuesta) => {
    console.log(respuesta);
  });
}
main();
