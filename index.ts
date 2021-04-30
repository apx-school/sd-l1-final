import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

//define los metodos a ejecutar segun el params que viene desde consola
function proceso(params){

  const controller = new PelisController()
  
  //crea un objeto del tipo peli a partir del params y lo manda al metodo add del controller
  if(params._[0] == "add"){
    const peliNueva = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    controller.add(peliNueva)
  }
  //crea un objeto con la key id apartir de la segunda posicion del params._ y lo manda al metodo getById
  if(params._[0] == "get"){
    const objeto = {
      id: params._[1]
    }
   const respuesta = controller.get(objeto)
   respuesta.then((x)=>{
      console.log(x);
   })
  }
  //crea un objeto que contiene al objeto search, este objeto search se usa para filtrar peliculas
  if(params._[0]=="search"){

    const objeto = {
      search:{
      title: params.title,
      tag: params.tag
      } 
    }

    const respuesta = controller.get(objeto)
    respuesta.then((x)=>{
    console.log(x);
    
    })
  }
  //si no se le pasa ningun parametro devuelve todas las peliculas
  if (params._[0]== undefined){
    const respuesta = controller.get({})
    respuesta.then((x)=>{
      console.log(x);
      
    })
  }
}
function main() {
  const params = parseaParams(process.argv.slice(2));
  proceso(params)
}

main();
