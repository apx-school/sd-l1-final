import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function procesaOpciones (controller:PelisController, params){

  if (params._ == "add"){

   controller.add(params)

   } else if (params._ == "search" || params._ =="get"){
  
    controller.get(params)
    .then((r) =>{console.log(r)})

   } else 
   {controller.promesa
    .then((r)=>{console.log(r)})
  }
  
};

function main() {
  
  const controller = new PelisController()
  const params = parseaParams(process.argv.slice(2));
  procesaOpciones(controller, params)
  //console.log(params)
  
}

main();
