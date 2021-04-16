import * as minimist from "minimist";
import {PelisController } from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  
  return resultado;
}

const parametros =  (parametros) => {
  const controller = new PelisController();
  
  if(parametros._[0] == 'add'){
    const peliAgregar = {id:parametros.id, title:parametros.title, tags:parametros.tags}
    return controller.add(peliAgregar).then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  }

  if(parametros._[0] == 'search'){
    let parametroIngresado = {}; 
    if(parametros.title && parametros.tag){
     parametroIngresado = {
        title: parametros.title , tags: parametros.tag
      }
    } else if (parametros.title){
      parametroIngresado = {
        title: parametros.title
      }
    }else if(parametros.tag){
      parametroIngresado = {
        tags: parametros.tag
      }
    }
    return controller.get({search: {parametroIngresado}}).then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  }

  if(parametros._[0] == "get"){
    const id = parametros._[1]
    return controller.get({id:id})
  }
  if(parametros._.length == 0){
    return controller.get([]).then((res) =>{
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const opciones = parametros(params);
  opciones.then((res) => {
    console.log(res)
  })
  
  console.log(params);
}

main();

