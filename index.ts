import { triggerAsyncId } from "async_hooks";
import * as minimist from "minimist";
import { PelisController } from "./controllers";
import * as process from "process"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log("params", params);
  console.log("--------------------")
  // const paramAction = params["_"];
  const peliController = new PelisController();

  console.log(params._[0])
  
  if(params._[0] == "get"){
    console.log("Se ejeguto GET de ID")
    const idToSearch = params._[1];
    const object = { id: idToSearch }
    // console.log(object.id)
    const promise = await peliController.get(object)

    console.log(promise);    
  }

  if(params._[0] == "add"){
    const object = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }

    return await peliController.add(object);
  }

  if(params._[0] == "search"){

    // console.log("Titulo desde params: ", params.title)
    // console.log("tag desde params: ", params.tag)



    var searchToTitle = {
      search: {title: params.title}
    }
    var searchToTags = {
      search: {tag: params.tag}
    }
    var fullSearch = { 
      search: {title: params.title, tag: params.tag}
    }

    console.log(params.title)
    // console.log(params.tag)
    if(params.title && params.tag){
      // console.log("Se ejecuta buscar con dos parametros")
      return peliController.get(fullSearch).then((obj) => {console.log(obj); return obj });
    } else if(params.title){
      // console.log("Se ejecuta buscar con title")
      return peliController.get(searchToTitle).then((obj) => {console.log(obj); return obj });
    } else if(params.tag){
      // console.log("Se ejecuta buscar con tag")
      return peliController.get(searchToTags).then((obj) => {console.log(obj); return obj });
    };

  }
  if(params._[0] == undefined){
    const option = {option: undefined};
    console.log("Se ejecuto index.ts sin parámetros");
    return await peliController.get(option).then((obj) => { console.log(obj); return obj });
  }
};

main();


