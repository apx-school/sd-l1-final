import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  var argv;
  if ( argv ="get" && argv.id){
    argv = this.pelis.getById(argv.id)
  } 
  return {
    add: resultado.add,
    get: resultado.get,
  };
}

function main() {
  const controller = new PelisController();

  controller.promise.then(() => {
    const params = parseaParams(process.argv.slice(2));
    console.log(params)
  });
}
