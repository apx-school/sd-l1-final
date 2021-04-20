import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  let auxiliar: {} = {};
  let propiedad: {} = {};

  if (resultado._[0] == "search") {
    for (const key in resultado) {
      if (key != "_") {
        auxiliar[key] = resultado[key];
      }
    }
    propiedad = { search: auxiliar };
  }
  if (resultado._[0] == "get") {
    propiedad = { id: resultado._[1] };
  }
  if (resultado._[0] == "add") {
    for (const key in resultado) {
      if (key != "_") auxiliar[key] = resultado[key];
    }
    propiedad = { add: auxiliar };
  }
  return propiedad;
}

function main() {
  const coll = new PelisController();
  coll.promesa.then(() =>{
    const params = parseaParams(process.argv.slice(2));
    coll.get(params).then((res =>{
      console.log(res)
      return res;
    }))
  })
}
main();