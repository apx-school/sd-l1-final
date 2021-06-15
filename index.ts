import * as minimist from "minimist";
import {PelisController} from "./controllers"
import {PelisCollection, Peli} from "./models"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function ejecutador (params) {
  const pelisController = new PelisController

  const peliEncontrada = pelisController.get(params).then((p)=>{
    console.table(p);
  })

  if ( params._ == "add") {
      console.log ("Se agregará la siguiente película:", params.title);
      delete params._
      pelisController.add(params); 

}

return peliEncontrada;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log ("los parametros llegan asi:", params)
  ejecutador (params)
} 

main();
