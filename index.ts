/*
En index.ts:

    Parseá los argumentos de la terminal.
    Usá la librería minimist. Los comandos que deberían funcionar son los siguientes:
*/


import minimist from "minimist";
import {PelisController} from "./controllers"
import { Peli } from "./models";

function parseaParams(argv: string[]) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController
  const parametro = Object.assign({}, params)
  delete parametro._
  
  const objetoUsable = {
    actions: params._[0],
    params: parametro
  }

  const controller = new PelisController();
  const TEST_ID = 1
  const SOME_TITLE = "SOME_TITLE"

  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", "SOME_TAG"],
  });
  const peli = await controller.get({ id: TEST_ID });
  console.log("soyPeli",peli)


  const controller2 = new PelisController();
  const peli2 = await controller.get({ id: 4321865 });
  console.log("soyPeli2",peli2)





  if (objetoUsable.actions === "get" || objetoUsable.actions == "search") {
    const resultado = pelisController.get(objetoUsable.params)
    return console.log(await resultado)
    } if (objetoUsable.actions === "add") {
      const agregable:any = objetoUsable.params
      const resultado = pelisController.add(agregable)
      return console.log(await resultado)
      } else {
        const resultado = pelisController.pelisCollection.getAll()
        return console.log(await resultado)
      }
}


main();
