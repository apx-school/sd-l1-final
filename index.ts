import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}


function parseaParamsTerminal(controller, params) {
  if(params._[0] == "add") { 
    return controller.add({id: params.id, title: params.title, tags: params.tags}).then((resultado) => {
      return resultado;
  });
  } else if(params._[0] == "get" && params._[1]){
    return controller.get({id: params._[1]}).then((resultado) => {
      return resultado;
  });
  } else if(params._[0] == "search" && params.title && params.tag){
    return controller.get({search: {title: params.title, tag: params.tag}}).then((resultado) => {
      return resultado;
  })
  } else if(params._[0] == "search" && params.title){
     return controller.get({search: {title: params.title}}).then((resultado) =>{
       return resultado;
  });
 } else if(params._[0] == "search" && params.tag){
     return controller.get({search: {tag: params.tag}}).then((resultado) => {
      return resultado;
 });
 } else if ({}) {
     return controller.get({}).then((resultado) =>{
       return resultado;
 })
 }
 }



function main() {
  const peliController = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  const resultadoFinal = parseaParamsTerminal(peliController, params);
  resultadoFinal.then((respuesta) => {
    console.log(respuesta)
  })
}

main();
