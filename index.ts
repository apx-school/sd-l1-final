import { Peli, PelisCollection } from "./models";
import { PelisController /* PelisControllerOptions */ } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(argumentos) {
  const pelis = new PelisController();
  const params = argumentos._[0];

  if (params == "get") {
    return pelis.get({ id: argumentos._[1] });
  } else if (params == "search") {
    return pelis.get({ title: argumentos.title, tags: argumentos.tags });
  } else if (params == "add") {
    return pelis.add({
      id: argumentos.id,
      title: argumentos.title,
      tags: argumentos.tags,
    });
  } else if (!params) {
    return pelis.pelisCollection.getAll();
  }
}

async function main() {
  const params = await parseaParams(process.argv.slice(2));
  const resultado = await processOptions(params);
  console.log(resultado);
  console.log(params);
}

main();
