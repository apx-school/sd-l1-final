import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function proceso(params){
  const controller = new PelisController()
  if(params._[0] == "add"){
    const peliNueva = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    controller.add(peliNueva)
  }
  if(params._[0] == "get"){
   const respuesta = controller.get(params)
   respuesta.then((x)=>{
      console.log(x);
   })
  }
  if(params._[0]=="search"){
    const objeto = {
      search:{
      title: params.title,
      tag: params.tag
      } 
    }
    const respuesta = controller.get(objeto)
    respuesta.then((x)=>{
    console.log(x);
    
    })
  }
}
function main() {
  const params = parseaParams(process.argv.slice(2));
 proceso(params)
}

main();
