import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseParams(argv: string[]): any {
  const result = minimist(argv);

  if (result._[0] === "get") {
    return {
      id: result._[1],
    };
  }

  if (result._[0] === "add") {
    return {
      id: result.id,
      title: result.title,
      tags: result.tags,
    };
  }

  if (result._[0] === "search") {
    return {
      search: {
        title: result.title,
        tag: result.tag,
      },
    };
  }

  return false;
}

async function main() {
  const params = parseParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params.id && params.tags && params.title) {
    const result = await controller.add(params);
    console.log(result);
  } else if (params) {
    const result = await controller.get(params);
    console.log(result);
  } else {
    const result = await controller.collection.getAll();
    console.log(result);
  }
}

main();
