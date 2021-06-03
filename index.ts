import * as minimist from "minimist";   //invoco a minimits
import { PelisController } from "./controllers";  //invoco la clase peliscontrollers desde controllers

function parseaParams(argv) {     //funcion para parsearparametros (argv)
  const resultado = minimist(argv);  //invoco a minimist (1)
  return resultado; //devuelvo 
}

function paramsOptions(controller, params) {
  if (params._[0] == "get") {   //si a parametros le paso "get"
        return controller.get({ id: params._[1] }); //devuelve el ID
  } else if (params._[0] == "search") {
    
        return controller.get({ search: params }); //busco por parametros titulo y tag
  }else if (params._[0] == "add") {  //agrego la pelicula que pase por parametros (la creo)
    
        return controller.add(params); //devuelvo esa pelicula
  } else {
   return controller.get(false); //devuelve TODAS las peliculas
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  paramsOptions(controller, params).then((r) => {
    console.log(r);
  });
}

main();