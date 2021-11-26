import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function processOptions(params) {
  const controller = new PelisController();

  //Parsea title and tag
  if (params._[0] == "search" && params.title && params.tag) {
    return controller
      .get({ title: params.title, tag: params.tag })
      .then((res) => res);
  }
  //Parsea title
  else if (params._[0] == "search" && params.title) {
    return controller.get({ title: params.title }).then((res) => res);
  }
  //Parsea tag
  else if (params._[0] == "search" && params.tag) {
    return controller.get({ tag: params.tag }).then((res) => res);
  }
  //Parsea add
  else if (params._[0] == "add") {
    return controller
      .add({ title: params.title, tags: params.tag, id: params.id })
      .then((res) => res);
  }
  //Parsea get
  else if (params._[0] == "get") {
    return controller.get({ id: params._[1] }).then((res) => res);
  }
  //Devuelve todos
  else if ({}) {
    controller.get({}).then((res) => res);
  }
}
function main() {
  const params = parseaParams(process.argv.slice(2));
  return processOptions(params).then((res) => console.log(res));
}

main();

// Los comandos que deberían funcionar son los siguientes:
// ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tag=action --tag=classic
// ts-node index.ts get 4411
// ts-node index.ts search --title="a"
// ts-node index.ts search --tag="classic"
// ts-node index.ts search --title="x" --tag="action"
// ts-node index.ts (este último comando debe devolver todas las películas)
