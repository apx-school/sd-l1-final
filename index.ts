import * as minimist from "minimist";
import { PelisController } from "./controllers";

function processOptions(controller, argumentos) {
  if (argumentos.search) {
    return controller.get(argumentos);
  } else if (argumentos.add) {
    return controller.add(argumentos.add);
  } else if (argumentos.get) {
    return controller.get(argumentos.get);
  } else {
    return controller.pelis.getAll();
  }
}
function parseaParams(argv) {
  const resultadoMinimist = minimist(argv);
  if (resultadoMinimist._[0] == "search") {
    return {
      search: { title: resultadoMinimist.title, tag: resultadoMinimist.tag },
    };
  } else if (resultadoMinimist._[0] == "add") {
    return {
      add: {
        id: resultadoMinimist.id,
        title: resultadoMinimist.title,
        tags: resultadoMinimist.tags,
      },
    };
  } else if (resultadoMinimist._[0] == "get") {
    return { get: { id: resultadoMinimist._[1] } };
  } else {
    return {};
  }
}

function main() {
  const controlador = new PelisController();
  const argumentosParseados = parseaParams(process.argv.slice(2));

  processOptions(controlador, argumentosParseados).then((i) => {
    console.log(i);
  });
}

main();
