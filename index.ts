import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

function processOptions(args) {
  const pelis = new PelisController();
  const params = args._[0];
  if (params === "get") {
    return pelis.get({ id: args._[1] });
  }
  if (params === "search") {
    return pelis.get({ search: args });
  }
  if (params === "add") {
    return pelis.add({ id: args.id, title: args.title, tags: args.tags });
  }
  if (!params) {
    return pelis.pelis.getAll();
  }
}

async function main() {
  const argumentos = await parseaParams(process.argv.slice(2));
  const resultado = await processOptions(argumentos);
  console.log(resultado);
}

main();