import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parserMinimist(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function parserTerminal(params, controller) {
  if (params._[0] == "add") {
    return controller.add(params).then((res) => res);
  } else if (params._[0] == "get" && typeof params._[1] == "number") {
    return controller.get({ id: params._[1] }).then((res) => res);
  } else if (params._[0] == "search" && params.title) {
    return controller
      .get({ search: { title: params.title } })
      .then((res) => res);
  } else if (params._[0] == "search" && params.tags) {
    return controller.get({ search: { tags: params.tags } }).then((res) => res);
  } else if (params._[0] == "search" && params.title && params.tags) {
    return controller
      .get({ search: { title: params.title, tags: params.tags } })
      .then((res) => res);
  } else if (params._.length == 0) {
    return controller.get({}).then((res) => res);
  }
}

function main() {
  const params = parserMinimist(process.argv.slice(2));
  const controller = new PelisController();
  controller.get(params).then((res) => console.log(res));
}

main();
