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
  const paramAction = params[0];
  const peliController = new PelisController();


  if(paramAction == "get"){
    const idToSearch = paramAction[1];
    const object = { id: idToSearch }
    return peliController.get(object)
  }
  if(paramAction == "add"){
    const object = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }

    return peliController.add(object);
  }
  if(paramAction == "search"){

  }

  
}

main();

// console.log(main());
