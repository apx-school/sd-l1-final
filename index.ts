import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function parametrosYControlador ( controlador, parametros ){
  if(parametros._[0]==="add"){
    const resultado = controlador.add({id: parametros.id, title: parametros.title, tags: parametros.tags})
    return resultado
  }

  else if(parametros._[0] === "get"){
      const resultado = controlador.get({id: parametros._[1]})
      return resultado
    }
    else if(parametros._[0] === "search" && parametros.title && parametros.tag){
      const resultado= await controlador.get({search:{title: parametros.title, tag: parametros.tag}})
      return resultado;
    }
  else if(parametros._[0] === "search" && parametros.title ){
    const resultado = await controlador.get({search:{title: parametros.title}})
    return resultado;
  }
  else if(parametros._[0] === "search" && parametros.tag ){
    const resultado = await controlador.get({search:{tag: parametros.tag}})
    return resultado;
  }

  else{
    const resultado = await controlador.get("nada")
    return resultado
  }

}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controlador = new PelisController;
  const finalParams = parametrosYControlador(controlador, params);
  

  console.log(await finalParams)
}

main();
