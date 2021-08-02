import { PelisController } from "./controllers";
import * as minimist from "minimist";

//Función para ejecutar comandos
function ejecutarComandos(params) {
  const controls = new PelisController();
  if (params.title && params.id && params.tags) {
    return controls.add(params).then((respuesta) => console.log(respuesta));
  } else if (params.search || params.id) {
    return controls.get(params).then((respuesta) => console.log(respuesta));
  } else if (params == 0) {
    return controls.get({}).then((respuesta) => console.log(respuesta));
  }
}

//Función para parsear los argumentos que se ingresan desde la terminal
function parseaParams(argv) {
  const resultadoMinimist = minimist(argv);
  if (resultadoMinimist._[0] == "get") {
    return { id: resultadoMinimist._[1] };
  } else if (resultadoMinimist._[0] == "search" && resultadoMinimist.title) {
    return { search: { title: resultadoMinimist.title } };
  } else if (resultadoMinimist._[0] == "search" && resultadoMinimist.tag) {
    return { search: { tag: resultadoMinimist.tag } };
  } else if (
    resultadoMinimist._[0] == "search" &&
    resultadoMinimist.tag &&
    resultadoMinimist.title
  )
    return {
      search: { tag: resultadoMinimist.tag, title: resultadoMinimist.title },
    };
  else if (resultadoMinimist._[0] == "add") {
    return {
      title: resultadoMinimist.title,
      id: resultadoMinimist.id,
      tags: resultadoMinimist.tags,
    };
  } else {
    return {};
  }
}

function main() {
  const argumentos = parseaParams(process.argv.slice(2));
  ejecutarComandos(argumentos);
}

main();
