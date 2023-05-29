import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
  
}


  function controllerParams(controller, params) {
    var accion: String = params._[0];
  
    if (accion == "add") {
      return controller.add(params).then((res) => res);
    } else if (accion == "get" && typeof params._[1] == "number") {
      return controller.get({ id: params._[1] }).then((res) => res);
    } else if (accion == "search" && params.title && params.tag) {
      return controller
        .get({ search: { title: params.title, tag: params.tag } })
        .then((res) => res);
    } else if (accion == "search" && params.title) {
      return controller
        .get({ search: { title: params.title } })
        .then((res) => res);
    } else if (accion == "search" && params.tag) {
      return controller.get({ search: { tag: params.tag } }).then((res) => res);
    } else if (params._.length == 0) {
      return controller.get({}).then((res) => res);
    }
  }
  
  


function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  controllerParams(controller, params).then((resultado) => {
    {
      console.log(resultado);
    }
  });
}

main();
