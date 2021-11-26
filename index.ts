import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function processOptions(params) {
  const controller = new PelisController();

  if (params._[0] == "search" && params.title && params.tags) {
    return controller
      .get({ title: params.title, tags: params.tags })
      .then((res) => res);
  } else if (params._[0] == "search" && params.title) {
    return controller.get({ title: params.title }).then((res) => res);
  } else if (params._[0] == "search" && params.tags) {
    return controller.get({ tags: params.tags }).then((res) => res);
  } else if (params._[0] == "add") {
    return controller
      .add({ title: params.title, tags: params.tags, id: params.id })
      .then((res) => res);
  } else if (params._[0] == "get") {
    return controller.get({ id: params._[1] }).then((res) => res);
  } else if ({}) {
    controller.get({}).then((res) => res);
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  return processOptions(params).then((res) => console.log(res));

  console.log(params);
}

main();
