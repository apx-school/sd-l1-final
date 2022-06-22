import * as minimist from "minimist";
import { PelisController } from "./controllers";

import * as _ from "lodash";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function processOptions(args) {
  const pelis = new PelisController();
  if (args._[0] === "get") {
    return pelis.get({ id: args._[1] });
  }
  if (args._[0] === "search") {
    return pelis.get({ search: args });
  }
  if (args._[0] === "add") {
    return pelis.add({ id: args.id, title: args.title, tags: args.tags });
  }
  if (!args._[0]) {
    return pelis.pelis.getAll();
  }
}

function main() {
  const argumentos = process.argv.slice(2);
  const parseados = parseaParams(argumentos);
  processOptions(parseados).then((r) => console.log(r));
}

main();

// function parseaParams(argv) {
//   const resultado = minimist(argv);

//   return resultado;
// }
// async function processOptions(args) {
//   const controllers = new PelisController();
// }

// function main() {
//   const params = parseaParams(process.argv.slice(2));
//   const resultado = controllers.get(params);
//   console.log(resultado);
// }

// main();
