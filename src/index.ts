import minimist from "minimist";

import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const args = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    const newPeli: Peli = {
      id: args.id,
      title: args.title,
      tags: args.tags,
    };
    const result = await controller.add(newPeli);
    console.log(result);
  } else if (args._[0] === "get") {
    const id = Number(args._[1]);
    const result = await controller.get({ id: id });
    console.log(result);
  } else if (args._[0] === "search") {
    const searchOptions: any = {};
    if (args.title) {
      searchOptions.title = args.title;
    }
    if (args.tag) {
      searchOptions.tag = args.tag;
    }
    const result = await controller.get({ search: searchOptions });
    console.log(result);
  } else {
    const result = await controller.get();
    console.log(result);
  }
}

main();
