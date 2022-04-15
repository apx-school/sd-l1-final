import * as minimist from "minimist";
import { PelisController } from "./controllers";
// usar minimist para parsear
function parseaParams(argv) {
  const result = minimist(argv);
  return result;
};

function processOptions(controller, params) {
  if (params._[0] == "get") {
    return controller.get({ id: params._[1] });
  } else if (params._[0] == "search") {
    return controller.get({ search: params });
  } else if (params._[0] == "add") {
    return controller.add(params);
  } else {
    return controller.get(false);
  }
};

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  processOptions(controller, params).then((res) => {
    console.log(res);
  });
};

main();