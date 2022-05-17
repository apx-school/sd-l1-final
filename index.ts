import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function processOptions(params){
  const PELIS_CONTROLLER = new PelisController();
  if(params._[0] == "get"){
    return await PELIS_CONTROLLER.get({id: params._[1]});
  }else if(params._[0] == "search"){
    if(params.title && params.tag){
      return await PELIS_CONTROLLER.get({search: {title: params.title, tags: params.tag}});
    }else if(params.title){
      return await PELIS_CONTROLLER.get({search: params.title});
    }else if(params.tag){
      const PELI = {id: params.id, title: params.title, tags: params.tags}
      return await PELIS_CONTROLLER.get(PELI);
    }
  }else{
    return PELIS_CONTROLLER.pelis.getAll();
  }
}
async function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params)
  const PROCES = async () => await processOptions(params);
  console.log(await PROCES());
}

main();
