import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function paramsOptions(controller, params) {
  if (params._[0] == "get") {
    return controller.get({ id: params._[1] });
  } else if (params._[0] == "search" && !params.tag) {
    delete params._;
    return controller.get({ search: params });
  } else if (params._[0] == "search" && params.tag) {
    delete params._;
    return controller.get({ search: params });
  } else if (params._[0] == "add") {
    delete params._;
    return controller.add(params);
  } else {
    return controller.get(false);
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  // console.log(params);

  const controller = new PelisController();
  paramsOptions(controller, params).then((r) => {
    console.log(r);
  });
}

main();
