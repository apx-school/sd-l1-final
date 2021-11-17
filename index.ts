import {PelisController} from "./controllers"
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "add") {
    return{
      id:resultado.id,
      title:resultado.title,
      tags:resultado.tags
    }
  }
  if (resultado._[0] == "get") {
    return{id:resultado._[1]}
  }
  if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return{search:{title:resultado.title, tag:resultado.tag}}
  }
  if (resultado._[0] == "search" && resultado.title) {
    return{search:{title:resultado.title}}
  }
  if (resultado._[0] == "search" && resultado.tag) {
    return{search:{tag:resultado.tag}}
  }
  else{
    return {}
  }
}

async function ejecutorDeParams(params) {
  const controller = new PelisController()
  if(params.id && params.title && params.tags ){
    return await controller.add(params)
  }
  if (params.id || params.search) {
    return await controller.get(params)
  }
  else{
    return await controller.get({})
  }
}
async function main() {
  const params = parseaParams(process.argv.slice(2));
  const result = await ejecutorDeParams(params)
  console.log(result);
}
  
main();
  
  
  
  
  
  
  
  

      
  

    
  
  




  
  
    

