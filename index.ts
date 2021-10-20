import * as minimist from "minimist";
import { PelisController } from "./controllers";

function ejecutarComando(params) {
  const control = new PelisController();
  if (params.title && params.id && params.tags) {
    return control.add(params).then((rta) => {
      return rta;
    });
  } else if (params.id) {
    return control.get(params).then((rta) => {
      return rta;
    });
  } else if (params.search) {
    return control.get(params).then((rta) => {
      return rta;
    });
  } else {
    return control.get({}).then((rta) => {
      return rta;
    });
  }
}

function parseaParams(argv) {
  const resultadoMinimist = minimist(argv);
  if (resultadoMinimist._[0] == "add") {
    return {
      id: resultadoMinimist.id,
      title: resultadoMinimist.title,
      tags: resultadoMinimist.tags,
    };
  } else if (resultadoMinimist._[0] == "get") {
    return { id: resultadoMinimist._[1] };
  } else if (
    resultadoMinimist._[0] == "search" &&
    resultadoMinimist.title &&
    resultadoMinimist.tags
  ) {
    return {
      search: { title: resultadoMinimist.title, tags: resultadoMinimist.tags },
    };
  } else if (resultadoMinimist._[0] == "search" && resultadoMinimist.title) {
    return { search: { title: resultadoMinimist.title } };
  } else if (resultadoMinimist._[0] == "search" && resultadoMinimist.tags) {
    return { search: { tags: resultadoMinimist.tags } };
  } else {
    return {};
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComando(params).then((resultado) => {
    console.log(resultado);
  });
}

main();
