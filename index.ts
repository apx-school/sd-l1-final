import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
};

function paramsExecutioner(params) {
  const controller = new PelisController()
  if(params._[0] == "add") { 
    return controller.add({id: params.id, title: params.title, tags: params.tags}).then((respuesta) => {
      return respuesta;
    });
  } else if (params._[0] == "get" && params._[1]){
    return controller.get({id: params._[1]}).then((respuesta) => {
      return respuesta;
    });
  } else if (params._[0] == "search" && params.title && params.tag){
    return controller.get({search: {title: params.title, tag: params.tag}}).then((respuesta) => {
      return respuesta;
    })
  } else if (params._[0] == "search" && params.title){
    return controller.get({search: {title: params.title}}).then((respuesta) =>{
      return respuesta;
    });
  } else if (params._[0] == "search" && params.tag){
    return controller.get({search: {tag: params.tag}}).then((respuesta) => {
      return respuesta;
    });
  } else if ({}) {
    return controller.get({}).then((respuesta) =>{
      return respuesta;
    })
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultadoFinal = paramsExecutioner(params);
  resultadoFinal.then((respuesta) => {
    console.log(respuesta);
  });
};

main();