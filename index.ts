import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv): any {
  const argumentos = minimist(argv);
  if (argumentos._[0] == "get") {
    return { id: argumentos._[1] };
  } else if (argumentos._[0] == "search") {
    return { search: { title: argumentos.title, tag: argumentos.tag } };
  } else if (argumentos._[0] == "add") {
    return {
      id: argumentos.id,
      title: argumentos.title,
      tags: argumentos.tags,
    };
  } else {
    return {};
  }
}

async function ejecutarParams(params): Promise<any> {
  const controller = new PelisController();
  if (params.id && params.title) {
    controller.add(params);
  } else if (params.id) {
    return await controller.get(params).then((r) => console.log(r));
  } else if (params.search) {
    return await controller.get(params).then((r) => console.log(r));
  } else {
    return await controller.get(params).then((r) => console.log(r));
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarParams(params);
}

main();
