import * as minimist from "minimist";
import {PelisController} from "./controllers";
import {PelisCollection} from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  let aux: {} = {};
  let prop: {} = {};

  if (resultado._[0] == "search") {
    for (const key in resultado) {
      if (key != "") {
        aux[key] = resultado[key];
      }
    }
    prop = { search: aux };
  }
  if (resultado._[0] == "get") {
    prop = { id: resultado._[1] };
  }
  if (resultado._[0] == "add") {
    for (const key in resultado) {
      if (key != "") aux[key] = resultado[key];
    }
    prop = { add: aux };
  }

  return prop;
}

function main() {
  const coll = new PelisController();
  coll.promesa.then(() => {
  const params = parseaParams(process.argv.slice(2));
  coll.get(params).then((n =>{
    console.log(n);

  }))

  console.log(params);
});
}

main();