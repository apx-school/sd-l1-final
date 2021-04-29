import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController()
  if(params._ == "add"){
    const peliNueva = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    controller.add(peliNueva)
  }
  if(params._ == "get"){
   const respuesta = controller.get(params)
   respuesta.then(()=>{
     console.log(respuesta);
   })
  }
  if(params._=="search"){
    console.log(params);
    
    const respuesta = controller.get(params)
    respuesta.then(()=>{
      console.log(respuesta);
      
    })
  }
}

main();
