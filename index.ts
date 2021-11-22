import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(controller, params) {
  if (params._[0] == "add") {
    return controller
      .add({
        id: params.id,
        title: params.title,
        tags: params.tags,
      })
      .then((res) => {
        return res;
      });
  } else if (params._[0] == "get") {
    return controller.get({ id: params._[1] }).then((res) => {
      return res;
    });
  } else if (params._[0] == "search" && params.title && !params.tag) {
    return controller.get({ search: { title: params.title } }).then((res) => {
      return res;
    });
  } else if (params._[0] == "search" && params.tag && !params.title) {
    return controller.get({ search: { tag: params.tag } }).then((res) => {
      return res;
    });
  } else if (params._[0] == "search" && params.title && params.tag) {
    return controller
      .get({ search: { title: params.title, tag: params.tag } })
      .then((res) => {
        return res;
      });
  } else if ({}) {
    return controller.get({}).then((res) => {
      return res;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  const rtado = processOptions(controller, params).then((res) => {
    console.log(res);
  });
}

main();

// POSIBLES COMANDOS
// ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
// ts-node index.ts get 4411
// ts-node index.ts search --title="a"
// ts-node index.ts search --tag="classic"
// ts-node index.ts search --title="x" --tag="action"
// ts-node index.ts (este último comando debe devolver todas las películas)
