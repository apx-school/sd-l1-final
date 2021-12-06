import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parserMinimist(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function parserTerminal(controller, params) {
  if (params._[0] == "add") {
    return controller
      .add({ id: params.id, title: params.title, tags: params.tags })
      .then((r) => r);
  } else if (params._[0] == "get") {
    return controller.get({ id: params._[1] }).then((r) => r);
  } else if (params._[0] == "search" && params.title) {
    return controller.get({ search: { title: params.title } }).then((r) => r);
  } else if (params._[0] == "search" && params.tag) {
    return controller.get({ search: { tag: params.tag } }).then((r) => r);
  } else if (params._[0] == "search" && params.title && params.tag) {
    return controller
      .get({ search: { title: params.title, tag: params.tag } })
      .then((r) => r);
  } else if ({}) {
    return controller.get({}).then((r) => r);
  }
}

function main() {
  const params = parserMinimist(process.argv.slice(2));
  const controller = new PelisController();
  parserTerminal(controller, params).then((res) => console.log(res));
}

main();
