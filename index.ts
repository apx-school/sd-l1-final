import * as minimist from "minimist";
import { PelisController } from "./controllers";

function comandos(params) {
  const controller = new PelisController();
  if (params.title && params.id && params.tags) {
    return controller.add(params).then((respuesta) => console.log(respuesta));
  } else if (params.search && params.id) {
    return controller.get(params).then((respuesta) => console.log(respuesta));
  } else {
    return controller.get({}).then((respuesta) => console.log(respuesta));
  }
}
function parseaparams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search" && resultado.tag && resultado.tag) {
    return { search: { tag: resultado.tag, title: resultado.title } };
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "serach" && resultado.tag) {
    return { serach: { tag: resultado.tag } };
  } else if (resultado._[0] == "add") {
    return {
      title: resultado.title,
      id: resultado.id,
      tags: resultado.tags,
    };
  } else {
    return {};
  }
}

function main() {
  const params = parseaparams(process.argv.slice(2));
  comandos(params);
}
main();
