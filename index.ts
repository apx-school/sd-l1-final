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
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else {
    return resultado;
  }
}

function selectorAddGet(objeto) {
  const controller = new PelisController();

  if (objeto.id && objeto.title && objeto.tags) {
    return controller.add(objeto).then((res) => {
      return res;
    });
  } else {
    return controller.get(objeto).then((res) => {
      return res;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const selector = selectorAddGet(params);

  selector.then((result) => {
    return console.log(result);
  });
}

main();
