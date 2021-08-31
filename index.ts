import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] }; //{ id: 4411 }
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else {
    return {};
  }
}

//Función para ejecutar comandos
function ejecutarComandos(params) {
  const objeto = new PelisController();
  if (params.title && params.id && params.tags) {
    return objeto.add(params).then((respuesta) => console.log(respuesta));
  } else if (params.search || params.id) {
    return objeto.get(params).then((respuesta) => console.log(respuesta));
  } else {
    return objeto.get({}).then((respuesta) => console.log(respuesta));
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComandos(params);
  //console.log(params);
}

main();
