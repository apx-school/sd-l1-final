import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else if (resultado._[0] == "search") {
    return {
      title: resultado.title,
      tag: resultado.tag,
    };
  } else if (resultado._[0] == "get") {
    return {
      id: resultado._[1],
    };
  } else {
    return {};
  }
}

function main() {
  const newPelisController = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  console.log("parámetros que salen desde la terminal", params);
  newPelisController.PelisControllerOptions(params);
}

main();

//parámetros que debería aceptar
//ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
//ts-node index.ts search --title="x" --tag="action"
//ts-node index.ts get 4411
