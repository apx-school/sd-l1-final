import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: string[]): any {
  const resultado = minimist(argv);

  if (resultado._[0] == "get") {
    return {
      id: resultado._[1],
    };
  }

  if (resultado._[0] == "add") {
    return {
      id: resultado["id"],
      title: resultado["title"],
      tags: resultado["tags"],
    };
  }

  if (resultado._[0] == "search") {
    return {
      search: {
        title: resultado["title"],
        tag: resultado["tag"],
      },
    };
  }

  return false;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));

  const controller = new PelisController();

  if (params.id && params.tags && params.title) {
    const result = await controller.add(params);

    return console.log(result);
  } else if (params) {
    const result = await controller.get(params);

    return console.log(result);
  }

  const result = await controller.collection.getAll();

  return console.log(result);
}

main();
