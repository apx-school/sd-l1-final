import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function objetos(params){
  const controller = new PelisController();
   
  if(params._[0]== "get"){
    return controller.get({id: params._[1]}).then((r) => {return r})
  }else if(params._[0] == "search"){
    if(params.tag && params.title){
    return controller.get({search: {title: params.title, tag: params.tag}})
    .then((r) => {return r})
    }else if(params.title){
      return controller.get({search: {title: params.title}}).then((r) => {return r})
    }else if(params.tag){
      return controller.get({search: {tag: params.tag}}).then((r) => {return r})
    }
    }else if(params._ == "add"){
    var objeto = {
       id: params.id,
       title: params.title,
       tags: params.tags
     };
     return controller.add(objeto)
  }else{ 
    return controller.get({}).then((r) => {return r})
  }

}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = objetos(params).then((resultado) => {
    console.log(resultado)
 })

}

main();
