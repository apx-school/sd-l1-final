import * as minimist from "minimist";
import { PelisController } from "./controllers"
import * as isEmpty from "lodash"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado
}

async function processOptions(opt) {
  const controller = new PelisController()
  if (opt["_"][0] == "add") {
    return await controller.add({
      id: opt.id,
      title: opt.title,
      tags: opt.tags
    }).then((res) => { return res })
    
  } else if (opt["_"][0] == "get") {
    return await controller.get({id: opt["_"][1]})
  
  } else if (opt["_"][0] == "search") {
    return await controller.get({
      search: { title: opt.title, tag: opt.tag }
    }).then((res) => { return res })
    
  } else if(isEmpty(opt)){
    return await controller.get(isEmpty())
  }
}

function main() {
  const comandos = parseaParams(process.argv.slice(2));
  return processOptions(comandos).then((res) => {
    console.log(res)
    return res
  })
}

main();
