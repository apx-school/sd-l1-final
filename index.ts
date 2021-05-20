import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv): PelisController {
  const resultado = minimist(argv);
  return resultado;
}

function paramsOptions(controller, params){
  var resultado;
  if(params._[0] == "add"){
    let pelicula = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    return resultado = controller.add(pelicula).then((res)=>{
      return res;
    });
  }
  if(params._[0] == "get"){
    return resultado = controller.get({id:params._[1]}).then((res)=>{
      return res;
    });
  }
  if(params._[0] == "search"){
    let opciones = {};
    if(params.title){
      opciones["title"] = params.title;
    }
    if(params.tag){
      opciones["tag"] = params.tag;
    }
    return resultado = controller.get({search: opciones}).then((res)=>{
      return res;
    });
  }
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  paramsOptions(controller, params).then((res)=>{
    console.log(res);
  });
}

main();
