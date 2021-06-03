import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function Options (peliControl , parametros){ 
 if (parametros._[0] == "get"){ 
  return peliControl.get({id: parametros._[1]});
 } else if (parametros._[0] == "search") {
  delete parametros._;
  return peliControl.get({ search: parametros });
} else if (parametros._[0] == "add") {
  delete parametros._;
  return peliControl.add(parametros);
} else {
  return peliControl.get(false);
}

} 

function main() {
  const argumentos = process.argv.slice(2); 
  const parametros = parseaParams(argumentos);
  const pelicontrol = new PelisController();
  Options(pelicontrol,parametros).then((resultado)=>{
    console.log(resultado);
  })

 
}

main();
