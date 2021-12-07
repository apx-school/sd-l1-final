import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  if ( resultado.search){
    return {search: resultado.search}
  }else {
    return {}
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
