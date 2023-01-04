import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(argumentos) {
  const pelisController = new PelisController();
  const params = argumentos._[0];
  if (params == "get") {
    return pelisController.get({id: argumentos._[1]});
  }
  if (params == "search") {
    return pelisController.get({search: argumentos});
  }
  if (params == "add") {
    return pelisController.add({id: argumentos.id, title: argumentos.title, tags: argumentos.tags})
  }
  if (!params) {
    return pelisController.pelis.getAll();
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = await processOptions(params);
  console.log(resultado);
}

main();
