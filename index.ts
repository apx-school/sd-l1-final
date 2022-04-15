import * as minimist from "minimist";
import {PelisController} from "./controllers"

function ejecutarComandos(params){
  const controller = new PelisController()
  if (params.title && params.id && params.tags) {
    return controller.add(params).then((r)=> console.log(r))
  } else if (params.search || params.id){
    return controller.get(params).then((r)=>console.log(r))
  } else if (params == 0){
    return controller.get({}).then((r)=>console.log(r))
  }
}
 



function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0]=="get") {
    return {id: resultado._[1]}
  }else if (resultado._[0]== "search" && resultado.title && resultado.tag) {
    return {search: {title:resultado.title, tag: resultado.tag}}
  }else if (resultado._[0]== "search" && resultado.title) {
    return {search: {title:resultado.title}}
  }else if (resultado._[0]== "search" && resultado.tag) {
    return {search: {tag: resultado.tag}}
  }else if (resultado._[0] == "add") {
    return {title:resultado.title,tags:resultado.tags,id:resultado.id}
  }else {
    return 0}
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComandos(params)
  
}

main();
