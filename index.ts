import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function paramsOptions (controller, params){
  var resultado ;
  if (params._[0] == "add"){
    let peli = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    return resultado = controller.add(peli).then((result)=>{return result});
  }
  if (params._[0] == "get"){
    return resultado = controller.get({id:params._[1]}).then((result)=>{return result});
  }
  if (params._[0]== "search"){
    let options = {};
    if (params.title){
      options["title"] = params.title;
    }
    if (params.tag){
      options["tag"] = params.tag;
    }
    return resultado = controller.get({search: options}).then((result)=>{return result});
  }
  if (params._.length == 0){
    return resultado = controller.get ({}).then((result)=>{return result});
  }
 
  return resultado;
  
}


function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  paramsOptions(controller, params).then((result)=>{console.log (result)});
  
  
 
}

main();
