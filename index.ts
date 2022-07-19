import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  let options: any;

  if (params._.length == 0) {
    let pelis = await controller.get(null);
    console.log(pelis);
  }

  if (params._[0] === "get") {
    options = {
      id: params._[1],
      search: { title: null, tag: null },
    };
    let pelis = await controller.get(options);
    console.log(pelis);
  }

  if (params._[0] === "search") {
    options = {
      id: null,
      search: { title: params.title, tag: params.tag },
    };
    let pelis = await controller.get(options);
    console.log(pelis);
  }

  if (params._[0] === "add") {
    options = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };

    await controller.add(options);
  }
}

main();
