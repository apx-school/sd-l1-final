import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";
const controller = new PelisController();

function parseaArgv(argv) {
  const params = minimist(argv);
  if (params._[0] == "get") {
    return { id: params._[1] };
  } else if (params._[0] == "add") {
    const peli: Peli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    return controller.add(peli);
  } else if (params._[0] == "search") {
    if (params.title && params.tag) {
      return { search: { title: params.title, tag: params.tag } };
    } else if (params.title) {
      return { search: { title: params.title } };
    } else if (params.tag) {
      return { search: { tag: params.tag } };
    }
  }
  return params;
}

async function main() {
  const params = parseaArgv(process.argv.slice(2));
  const resultado = await controller.get(params);
  console.log(resultado);
}

main();
