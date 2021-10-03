import * as minimist from "minimist";
import { formatWithOptions } from "util";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log(resultado)
  const opciones = {
    accion: resultado._[0],
    params: {
      id: resultado.id,
      title:resultado.title,
      tags:resultado.tag,
      search:{
        title:resultado.title,
        tags:resultado.tag,
      }
    },
    
  }

  if(opciones.accion == "search"){
    return {
      accion: "search",
      params: {
        id: null,
        title:null,
        tags:null,
        search:{
          title:resultado.title,
          tags:resultado.tags,
        }
      }  
    }
  }

  if(opciones.accion == "get"){
    return {
      accion: "get",
      params: {
        id: resultado._[1],
        title:null,
        tags:null,
        search:null
      },
      search: null
    }
  } else if(opciones.accion == "add"){
    return  {
      accion: resultado._[0],
      params: {
        id: resultado.id,
        title:resultado.title,
        tags:resultado.tags,
      },
      
    }
  } else {
    return {
      accion: null,
      params: {
        id: null,
        title:null,
        tags:null,
        serach:null
      },
      
    }
  }
  
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controlPelis = new PelisController
  if(params.accion == "get"||!params.accion){
    controlPelis.get(params.params).then((resultado)=>{
      console.log(resultado);
    })
  } else if(params.accion == "add"){
    controlPelis.add(params.params).then((resultado)=>{
      console.log(resultado);
    })

  } else if(params.accion == "search"){
    controlPelis.get(params.params).then((resultado)=>{
      console.log(resultado);
    })
  }
}

main();
