import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function objetos(params){
  const controller = new PelisController();
   
  if(params._ == "get"){
    return controller.get({id: params.id}).then((r) => {return r})
  }else if(params._ == "search"){
    if(params.title){
      return controller.get({search: {title: params.title}}).then((r) => {return r})
    }else if(params.tags){
      return controller.get({search: {tags: params.tags}}).then((r) => {return r})

    }else if(params.tags && params.title){
      return controller.get({search: {title: params.title, tags: params.tags}})
      .then((r) => {return r})
 
    }
    return controller.get(objeto).then((r) => {return r})
  }else if(params._ == "add"){
    var objeto = {
       id: params.id,
       title: params.title,
       tags: params.tags
     };
     return controller.add(objeto)
  }else if(params.lenght == 0){
    return controller.get([]).then((r) => {return r})
  }
  
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = objetos(params).then((resultado) => {
    console.log(resultado)
  })

}

main();
