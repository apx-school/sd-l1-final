import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function filtrador(params){
  const controlador = new PelisController()
  if (params._[0] == "get"){
    return await controlador.get({id: params._[1]})
  } else if(params._[0] == "add"){
    return await controlador.add({'id': params.id, 'title': params.title, 'tags': params.tags})
  } else if(params._[0] == "search"){
    return await controlador.get({search: {title: params.title, tag: params.tag}})
  }else{
    return await controlador.peliculas.getAll() 
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  filtrador(params).then((res)=>{
    console.log(res)
    return res
  })
}

main();
