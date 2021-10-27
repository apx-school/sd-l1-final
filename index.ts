import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
};

function resultadoFinalParseado(controller, params) {
  if(params._[0] == "add") { 
    return controller.add(params).then((respuesta) => {
      return respuesta;
    });
  } else if (params._[0] == "get" && params._[1]){
    return controller.get({id: params._[1]}).then((respuesta) => {
      return respuesta;
    });
  } else if (params._[0] == "search" && params.title){
    return controller.get(params.title).then((respuesta) =>{
      return respuesta;
    });
  } else if (params._[0] == "search" && params.tag){
    return controller.get(params.tag).then((respuesta) => {
      return respuesta;
    });
  } else if (params._[0] == "search" && params.title && params.tag){
    return controller.get({title: params.title, tag: params.tag}).then((respuesta) => {
      return respuesta;
    })
  } else if ({}) {
    return controller.get().then((respuesta) =>{
      return respuesta;
    })
  }
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  const resultadoFinal = resultadoFinalParseado(controller, params);
  console.log(resultadoFinal);
  resultadoFinal.then((respuesta) => {
    console.log(respuesta);
  })
};

main();
