import * as minimist from "minimist";
import { PelisController } from "./controllers";

async function processOptions(argsParseados) {
  const pelis = new PelisController();
  const task = argsParseados._[0];

  switch (task) {
    case "get":
      return pelis.get({
        id: argsParseados._[1], // asi funciona
      });
    case "search":
      return pelis.get({
        search: { title: argsParseados.title, tag: argsParseados.tag },
      });
    case "add":
      return pelis.add({
        id: argsParseados.id, // asi funciona
        title: argsParseados.title, // asi funciona
        tags: argsParseados.tags, // asi funciona
      });
    default:
      return pelis.get();
  }
}

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const argsParseados = parseaParams(process.argv.slice(2));
  const result = await processOptions(argsParseados);
  console.log(result);
  return result;
}

main().catch((error) => {
  console.error(error);
});
