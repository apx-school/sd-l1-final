import * as minimist from "minimist";
import { title } from "process";
import { PelisController } from "./controllers"
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado; 
}

function paramsForController(input , output){
  if (input._[0] == "add"){
    let peliAdd = {
      id : input.id,
      title : input.title,
      tags : input.tags
    }
    return peliAdd
  }
  if (input._[0]== "get"){
    return {id:input._[1]}
  } else if (input._[0] == "search" && input.title && input.tag){
    return {search : {title:input.title, tags:input.tags}}
  }
  else if (input._[0] == "search" && input.title){
    return {search : {title : input.title}}
  }
  else if (input._[0] == "search" && input.tags){
    return {search : {tags : input.tags}}
  }
}




function main() {
  const controller = new PelisController()
  const argumentosTerminal = process.argv.slice(2)
  const params = parseaParams(argumentosTerminal);
  
  paramsForController(params,controller).then((resultado) => {
    console.log(resultado);
  })


}

main();
