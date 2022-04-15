import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const result = minimist(argv);
  return result;
}

function paramsOptions(controller, params) {
  if (params._[0] == "get") {
    return controller.get({ id: params._[1] });
  } else if (params._[0] == "search") {
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
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  paramsOptions(controller, params).then((result) => {
    console.log(result);
  });
}

main();
