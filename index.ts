import { triggerAsyncId } from "async_hooks";
import * as minimist from "minimist";
import { PelisController } from "./controllers";
import * as process from "process"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log("params", params);
  const paramAction = params["_"];
  const peliController = new PelisController();

  // console.log(paramAction)


  if(paramAction[0] == "get"){
    const idToSearch = paramAction[1];
    // parseInt(idToSearch);
    // console.log(idToSearch);
    const object = { id: idToSearch }
    const promise = peliController.get(object)
    .then((obj) => {
       console.log(obj);
       return obj
      })
    .catch((err) => { console.log(err) });
    return promise
  }
  if(paramAction == "add"){
    const object = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }

    return  peliController.add(object)
    .then((obj) => { return obj })
    .catch((err) => { console.log(err) });
  }
  if(paramAction == "search"){

    const searchToTitle = {
      search: {title: params.title}
    }
    const searchToTags = {
      search: {tags: params.tag}
    }
    const fullSearch = { 
      search: {title: params.title, tags: params.tags}
    }

    console.log(params.title)
    console.log(params.tag)
    if(params.title != undefined && params.tag != undefined){
      return peliController.get(fullSearch).then((obj) => {console.log(obj); return obj });
    } else if(params.title != undefined){
      return peliController.get(searchToTitle).then((obj) => {console.log(obj); return obj });
    } else {
      return peliController.get(searchToTags).then((obj) => {console.log(obj); return obj });
    };

  }else{
    const option = {option: undefined};
    console.log("Se ejecuto index.ts sin parámetros");
    return peliController.get(option).then((obj) => { console.log(obj); return obj });
  }
  
};

main();

// console.log(main());
