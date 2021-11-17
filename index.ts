import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parsearParametros(argv) {
  const resultado = minimist(argv);
  return resultado;
  }

function controlador(params){
  const pelisController = new PelisController

  if (params._ == "search") {
    pelisController.get({ search: { title: params.title, tag: params.tag } }).then((i) => {
      return i;
    })
  } else if (params._ == "add") {
    console.log("Haz agregado una pelicula", params.title);
    delete params._
    pelisController.add(params);
  } else if (params._ == "get") {
    pelisController.get({ get: { id: params._[1] } })
  }
  else return pelisController.get(params).then((p) => { console.log(p) });
}


function main() {
  const argumentos = process.argv.slice(2);
    const parse = parsearParametros(argumentos);
    console.log(parse);
    controlador(parse);
}

main();
