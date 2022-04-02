import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv)
  const controller = new PelisController()
  const funcionAEjecutar = resultado._
  const ejecucion = funcionAEjecutar[0]
  if (ejecucion === "get") {
    return controller.get({id:funcionAEjecutar[1]})
  } else if (ejecucion === "search"){
    return controller.get({search:resultado})
  } else if (ejecucion === "add"){
    const peliAPushear = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags
    }
    return controller.add(peliAPushear)
  }
  return controller.get({})
}


async function main() {
  const inputBruto = process.argv.slice(2)
  const final = await parseaParams(inputBruto)
  console.log(final)
}

main();
