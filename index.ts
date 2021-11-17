import * as minimist from "minimist";
import { argv } from "process";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
  

}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  
  
  
  //Instanciamos el objeto PellisController para interactual con el PelisControllerOptions
  const o = new PelisController
  const ooo = Object.assign({}, params)
  delete ooo._
  
  const a = await o.processOptions({
    actions: params._[0],
    params: ooo
  })
  
  return console.log(a)

}

main();
