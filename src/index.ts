import * as minimist from "minimist";
import { Peli } from "./models";
import { PelisController } from "./controllers";
const minimist = require('minimist')
function parseaParams(argv) {
  const resultado = minimist(argv);
if (resultado.get){
  return {get: resultado.get}
}else if (resultado.add){
  return {add: resultado.add}
}else if(resultado.search){
  return {search : resultado.search}
}
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
const argumentosParseados = parseaParams(params)
const peliController = new PelisController()
peliController.get(argumentosParseados).then((resultado)=>{console.log(resultado)})
  console.log(params);
}

main();