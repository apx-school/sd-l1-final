import * as minimist from "minimist";
import {PelisController} from "./controllers";
import {Peli} from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function paramAdd(param){
  let resultado: Peli;
  if(param._[0] == "add"){
    resultado = {
      id: param.id,
      title: param.title,
      tags: [param.tags]
    };
  }
  return resultado;
}

function paramGet(param){
  if(param._[0] == "get"){
    return {id: param._[1]};
  } else if(param._[0] == "search" && param.title && param.tags){
    return {search: {title:param.title, tags:param.tags}}
  }
  else if(param._[0] == "search" && param.tags){
    return {search: {tags: param.tags}};
  }
  else if(param._[0] == "search" && param.title){
    return {search: {title: param.title}};
  }
}

function main() {
  const peliController = new PelisController() 
  const params = parseaParams(process.argv.slice(2));
  if(params._[0] == "add"){
    const param = paramAdd(params)
    const resultado = peliController.add(param).then((res) => {
      console.log(res)
    })
    return resultado
  }
  else if(params._[0] == "search"){
    const param = paramGet(params);
    const resultado = peliController.get(param).then((res) => {
      console.log(res);
    })
    return resultado
  }
  else if(params._[0] == "get"){
    const param = paramGet(params);
    const resultado = peliController.get(param).then((res) => {
      console.log(res);
    })
    return resultado;
  }
  else {
    return peliController.get(params).then((res) => {
      console.log(res)
    })
  }
}

main();
