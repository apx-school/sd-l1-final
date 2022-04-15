import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const RESULTADO = minimist(argv);
  return RESULTADO;
}

function main() {
  const PARAMS = parseaParams(process.argv.slice(2));
  const CONTROLLER = new PelisController(); //instancia del controller

  if (PARAMS._[0] === "get") {
    let getId = PARAMS._[1];
    return CONTROLLER.get({ id: getId }).then((r) => console.log(r));
  } else if (PARAMS._[0] === "search") {
    if (PARAMS.title) {
      return CONTROLLER.get(PARAMS).then((res) => console.log(res));
    }
    if (PARAMS.tag) {
      return CONTROLLER.get(PARAMS).then((r) => console.log(r));
    }
  } else if (PARAMS._[0] === "add") {
    return CONTROLLER.add(PARAMS).then((re) => console.log(re));
  } else {
    return CONTROLLER.get(PARAMS).then((ress) => console.log(ress));
  }
}

main();
