/*
En index.ts:

    Parseá los argumentos de la terminal.
    Usá la librería minimist. Los comandos que deberían funcionar son los siguientes:
*/


import * as _ from "lodash";
import * as minimist from "minimist";
import { PelisController } from "./controllers";
import {  PelisCollection } from "./models";

function parseaParams(argv: string[]) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
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
      return dato.get(objetoUsable.params).then((res)=>{return res})
    } if (objetoUsable.actions == "search") {
      return dato.get(objetoUsable.params).then((res)=>{return res})
    } 
    if (objetoUsable.actions == "add") {
      const agregable:any = objetoUsable.params
      return dato.add(agregable).then((res)=>{return res})
    } else {
      return dato.get(objetoUsable).then((res)=>{return res})
    }
  

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

