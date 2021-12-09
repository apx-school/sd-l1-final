import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  //parsea metodo ad id:4, title: "titulo", tag

  //
 if (resultado.add) {
   
 } else {
   
 }
}

function main() {
  const arg = process.argv.slice(2);
  const argParseado = parseaParams(arg);
  const controller = new PelisController();
  controller.get (argParseado).then((p)=> 
  console.log(p));
}

main();
