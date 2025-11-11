import { parseArgs, parseEnv } from "util";
import { Options, PelisController } from "./controllers";

import minimist from "minimist";
import { Peli } from "./models";
import { time } from "console";
import { title } from "process";
import { rmSync } from "fs";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const accion = params._[0]? params._[0] : null;
     
  // mostrar todas las pelis si no hay accion
  if(accion === null){
    console.log("mostrar todas las peliculas");
    const listaPelis = await controller.get()
    console.log(listaPelis); 
  }
  if(accion === "add"){
    if(params.id && params.title && params.tags){
      const result = await controller.add(params);
      if(result){
        console.log("La pelicula se agrego correctamente")
      }else{
        console.log("La pelicula ya existe");
      }
    }else{
      console.log("Faltan propiedades: Las peliclas deben tener 'Id', 'title' y 'tags'");
    }
  }else
  if(accion === "get"){
    const busqueda = params._[1]? {id: Number(params._[1])}: undefined;

    if(busqueda){
      const result = await controller.get(busqueda);
      if(result.length === 0){
        console.log("La pelicula no se encontro")
      }else{
        console.log(result);
      }
    }else{
      console.log("No se ingreso ningun id para buscar")
    }
  }else   
  if(accion === "search"){
    const option: Options = {search: {}};
    if(params.title && params.tag){
      option.search = {title: params.title, tag: params.tag}
      
    }else if(params.title){
      option.search = {title: params.title}
    }else if(params.tag){
      option.search = {tag: params.tag}
    }
    const result = await controller.get(option);
    if(result.length===0){
      console.log("No se encontro la peli")
    }else{
      console.log(result)
    }
  }else{
    console.log(`La accion "${params._[0]}" no es aceptable`);
  }
  
}

main();
