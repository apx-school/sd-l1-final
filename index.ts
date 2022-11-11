import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else if (resultado._) {
    if (resultado._[0] == "get") {
      return { id: resultado._[1] };
    }
    // else if (resultado._[0] == "add") {
    // }
  } else if (resultado.id) {
    return { id: resultado.id };
  } else if (resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else {
    return {};
  }

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();
  // console.log(params);
  pelisController.get(params).then((res) => {
    console.log(res);
  });
}

main();
