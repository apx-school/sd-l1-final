import * as minimist from "minimist";
import {PelisController} from "./controllers";



function parseaParams(argv) {
  const resultado = minimist(argv);
 
  return resultado;
}
 
function getController(controller, params) {
    if (params._ == "add") {
      controller.add(params);
    } else if (params._.includes("get")) {
      controller.get({ id: params._[1] }).then((res) => console.log(res));
    } else if (params._ == "search") {
      delete params._;
      controller.get({ search: params }).then((res) => console.log(res));
    } else {
      controller.get({}).then((res) => console.log(res));
    }
  }
function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController()
  getController(controller, params)

  console.log(params);
}

main();
