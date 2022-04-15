import * as minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function parametros(controller, params) {
  if (params._ == "add") {
    controller.add(params);
  } else if (params._.includes("get")) {
    controller.get({ id: params._[1] }).then((x) => console.log(x));
  } else if (params._ == "search") {
    delete params._;
    controller.get({ search: params }).then((x) => console.log(x));
  } else {
    controller.get().then((x) => console.log(x));
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  parametros(controller, params);
  console.log(params);
}

main();