import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function optionsController(params) {
  const controller = new PelisController();

  if (params._[0] === "add") {
    delete params._;
    return controller.add(params).then((r) => console.log(r));
  }

  if (params._[0] === "get") {
    return controller.get({ id: params._[1] }).then((r) => console.log(r));
  }

  if (params._[0] === "search") {
    delete params._;
    return controller.get({ search: params }).then((r) => console.log(r));
  }

  if (params._) {
    return controller.get().then((r) => console.log(r));
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  optionsController(params);
}

main();
