import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const params = minimist(argv);
  if (params._[0] == "add") {
    return {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
  } else if (params._[0] == "search") {
    return {
      search: {
        title: params.title.toLowerCase(),
        tag: params.tag,
      },
    };
  } else if (params._[0] == "get") {
    return {
      id: params._[1],
    };
  } else {
    return {};
  }
}

function main() {
  const newPelisController = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  newPelisController.PelisControllerOptions(params);
}

main();

//parámetros que debería aceptar
//ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
//ts-node index.ts search --title="x" --tag="action"
//ts-node index.ts get 4411
