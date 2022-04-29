import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  const controller = new PelisController()
  const infoDeTerminal = resultado._
  const params = infoDeTerminal[0]
  if (params === "get"){
    return controller.get({id: infoDeTerminal[1]})
  }
  else if (params === "search"){
    return controller.get({search: resultado})
  }
  else if (params === "add"){
    return controller.add({
      "title":infoDeTerminal.title,
      "id": infoDeTerminal.id,
      "tags":infoDeTerminal.tag
    })
    
  }

  else return controller.get({})
}

async function main() {
  const params = (process.argv.slice(2));
  const resultado = await parseaParams(params)
  console.log(resultado);
}

main();
