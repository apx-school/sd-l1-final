/*
En index.ts:
<<<<<<< HEAD

    Parseá los argumentos de la terminal.
    Usá la librería minimist. Los comandos que deberían funcionar son los siguientes:
*/


import * as _ from "lodash";
import * as minimist from "minimist";
import { PelisController } from "./controllers";
import {  PelisCollection } from "./models";

=======

    Parseá los argumentos de la terminal.
    Usá la librería minimist. Los comandos que deberían funcionar son los siguientes:
*/


import minimist from "minimist";
import {PelisController} from "./controllers"
import { Peli } from "./models";

>>>>>>> a3652928279cba95d8d33aa7aedeb6921fe0f9d4
function parseaParams(argv: string[]) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
<<<<<<< HEAD
  const params2 = parseaParams(process.argv.slice(2));
  let borrable = "_"
  delete params2[borrable] 
  
  const objetoUsable = {
    actions: params._[0],
    params: params2
  }

  //  console.log(objetoUsable)
  const dato = new PelisController;

  if (objetoUsable.actions == "get") {
      return dato.get(objetoUsable.params).then(console.log)
    } if (objetoUsable.actions == "search") {
      return dato.get(objetoUsable.params).then(console.log)
    } 
    if (objetoUsable.actions === "add") {
      const agregable:any = objetoUsable.params
      return dato.add(agregable).then(console.log)
    } else {
      return dato.pelisCollection.getAll().then(console.log)
    }
  

=======
  const pelisController = new PelisController
  const parametro = Object.assign({}, params)
  delete parametro._
  
  const objetoUsable = {
    actions: params._[0],
    params: parametro
  }

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
>>>>>>> a3652928279cba95d8d33aa7aedeb6921fe0f9d4
}


main();
// const TEST_ID = "TEST_ID";
// const SOME_TITLE = "una peli " + "TEST_ID";
// const SOME_TAG = "tag " + "TEST_ID";

// collection.add({
//   id: 111,
//   title: TEST_ID,
//   tags: [SOME_TAG]
// })

// const controller = new PelisController();
// const peli = await controller.get({ id: 111 });
// console.log("soypeli",peli)
// console.log(TEST_ID === peli.title);

