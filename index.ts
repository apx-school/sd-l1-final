import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));

  const controlador = new PelisController;

  if(params["_"].indexOf("get") != -1){
    console.log(await controlador.get({id: params["_"][1]}));
  }
  else if(params["_"].indexOf("add") != -1){
    console.log(await controlador.add({id: params["id"], title: params["title"], tags: params["tags"]}));
  }
  else if(params["_"].indexOf("search") != -1){
    console.log(await controlador.get({search:{title: params["title"], tag: params["tag"]}}));
  }
  else{
    console.log(await controlador.get({}));
  }
}

main();
