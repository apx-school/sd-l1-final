import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptiones(args) {
  const pelis = new PelisController();
  const parametros = args._[0];

  if (parametros == "add") {
    return await pelis.add({
      id: args.id,
      title: args.title,
      tags: args.tags,
    });
  }
  if (parametros == "get") {
    return await pelis.get({ id: args._[1] });
  }
  if (parametros == "search") {
    return await pelis.get({
      search: { title: args.title, tag: args.tag },
    });
  }
  if (!parametros) {
    return await pelis.get({});
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const result = await processOptiones(params);
  console.log(result);
}

main();
