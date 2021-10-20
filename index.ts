import * as minimist from "minimist";
import { PelisController } from "./controllers";

function ejecutarComando(params) {
  const control = new PelisController();
  if (params.title && params.id && params.tags) {
    return control.add(params).then((respuesta) => {
      return respuesta;
    });
  } else if (params.id) {
    return control.get(params).then((respuesta) => {
      return respuesta;
    });
  } else if (params.search) {
    return control.get(params).then((respuesta) => {
      return respuesta;
    });
  } else {
    return control.get({}).then((respuesta) => {
      return respuesta;
    });
  }
}
function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    return { id: resultado.id, title: resultado.title, tags: resultado.tags };
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else {
    return {};
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComando(params).then((respuesta) => {
    console.log(respuesta);
  });
}

main();
