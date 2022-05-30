import {PelisController} from "./controllers"
import * as minimist from "minimist";

//RETORNA ARGUMENTOS
function parseaParams(argv) {
  const resultado = minimist(argv);

  //Parseo para add
  if(resultado["_"] == "add"){
    const rta = {add:{id:resultado.id,title:resultado.title,tags:resultado.tags}}
    return rta 
  }
  if(resultado["_"] == "search"){
    const tag = resultado.hasOwnProperty("tag")
    const title = resultado.hasOwnProperty("title")
    
    if(tag && title ){
      return {search:{title:resultado.title,tag:resultado.tag}}
    }
    else if(tag && !title){
      return {search:{tag:resultado.tag}}
    }
    else if(!tag && title){
      return{search:{title:resultado.title}}
    }
  }
  //retorno un objeto vacio que activaria el getAll en search
  else if(resultado["_"][0] == "get"){
    const rta = {get:{id:resultado["_"][1]}}
    return rta
  }
  else{return {get:{}}}
}

//INSTANCIO CONTROLADOR
async function controller(options){
  const controller = new PelisController()

  if(options.hasOwnProperty("add")){
    const rtaAdd = await controller.add(options.add)
    return rtaAdd
  }
  else if(options.hasOwnProperty("get")){
    const rtaGet = await controller.get(options.get)
    return rtaGet
  }
  else if(options.hasOwnProperty("search")){
    const rtaSearch = await controller.get(options)
    return rtaSearch
  }

  
}


async function main() {
  const options = parseaParams(process.argv.slice(2));
  console.log("--",options,"--")
  const rtaController = await controller(options)
  console.log(rtaController);
  
  
  
}

main();
