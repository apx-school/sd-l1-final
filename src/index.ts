import minimist from "minimist";
import { Peli, PelisCollection, SearchOptions } from "./models";
import { PelisController, Options } from "./controllers";

function parseaParams(argv) {
  const comando = argv[0];
  const args = minimist(argv.slice(1));

  let add = null;
  let get = null;
  let search = null;

  if (comando === "add") {
    add = {
      id: Number(args.id),
      title: args.title,
      //tags siempre va a devolver array para no generar errores.-
      tags: Array.isArray(args.tags) ? args.tags : [args.tags].filter(Boolean),
    };
  } else if (comando === "get") {
    get = { id: Number(argv[1]) || Number(args.id) };
  } else if (comando === "search") {
    search = {
      title: args.title,
      tag: args.tag,
    };
  }

  return { add, get, search };
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController();

  let result;
  if (params.add) {
    result = await peliController.add(params.add);
  } else if (params.get) {
    result = await peliController.get(params.get);
  } else if (params.search) {
    result = await peliController.get({ search: params.search });
  } else {
    result = await peliController.get();
  }

  console.log(result);
}

main();
