import { strict } from "assert";
import * as minimist from "minimist";
import {PelisController} from "./controllers";



function parseaParams(argv) {
  const parsearArg = minimist(argv);
  const resultado = {method: "get", options: {}};
if(parsearArg._.includes("get")){
  resultado.method ="get";
  resultado.options = {id: parsearArg._[1]};
}else if(parsearArg._.includes('search')){
  resultado.method = "get";
  resultado.options ={search: {title: parsearArg.title, tag: parsearArg.tag}};
} else if(parsearArg._.includes('add')){
  resultado.method = "add";
  resultado.options ={id:parsearArg.id, title:parsearArg.title, tags: parsearArg.tags};
} 
console.log(parsearArg);
console.log(resultado);
return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
 const controllerPelis = new PelisController();
 controllerPelis[params.method](params.options).then((resultadoFinal) =>{
   console.log(resultadoFinal);
 });
}

main();
