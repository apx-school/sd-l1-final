import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function controllerConParams(controller, params) {
  if (params._[0] == "add") {
    return controller
      .add({ id: params.id, title: params.title, tags: params.tags })
      .then((result) => {
        return result;
      });
  } else if (params._[0] == "get" && params._[1]) {
    return controller.get({ id: params._[1] }).then((result) => {
      return result;
    });
  } else if (params._[0] == "search" && params.title && params.tag) {
    return controller
      .get({ search: { title: params.title, tag: params.tag } })
      .then((result) => {
        return result;
      });
  } else if (params._[0] == "search" && params.title) {
    return controller
      .get({ search: { title: params.title } })
      .then((result) => {
        return result;
      });
  } else if (params._[0] == "search" && params.tag) {
    return controller.get({ search: { tag: params.tag } }).then((result) => {
      return result;
    });
  } else if (params._.length == 0) {
    return controller.get("{}").then((result) => {
      return result;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  const procesoFinal = controllerConParams(controller, params);
  procesoFinal.then((final) => {
    console.log(final);
  });
}

main();
