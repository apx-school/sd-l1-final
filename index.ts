import * as minimist from "minimist";
import {PelisController} from "./controllers";
function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function doForInput(controller, params){

  if(params._[0] == "get" && typeof params._[1] == "number"){
    return controller.get({id:params._[1]}).then((result)=>{
      return result;
    });
  }
  else if(params._[0] == "search" && params.tag && !params.title){
    return controller.get({search:{tag:params.tag}}).then((result)=>{
      return result;
    });
  }
  else if(params._[0] == "search" && params.title && !params.tag){
    return controller.get({search:{title:params.title}}).then((result)=>{
      return result;
    });
  }
  else if(params._[0] == "search" && params.title && params.tag){
    return controller.get({search:{title:params.title, tag:params.tag}}).then((result)=>{
      return result;
    });
  }
  else if(params._[0] == "add"){
    return controller.add(params).then((result)=>{
      return result;
    });
  }
  else{
    return controller.get(params).then((result)=>{
      return result
    });
  }
}

function main() {
  const controller = new PelisController();
  controller.promise.then(()=>{
    const params = parseaParams(process.argv.slice(2));
    doForInput(controller,params).then((procesado) =>{
      console.log("resultado:",procesado)
    });
  });
}



main();
