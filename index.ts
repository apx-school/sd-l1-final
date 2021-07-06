import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  const controller = new PelisController();

  // cada una de las opciones de lo que se ingresa por la terminal, ya parseado con minismist, para derivarlo correspondientemente a get() en la funcion main.
  if (resultado._ === "add") {
    return controller.add({
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    });
  }

  if (resultado._[0] === "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] === "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] === "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else if (resultado._[0] === "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else {
    return controller.pelisColl.getAll();
  }
}

function main() {
  const controller = new PelisController();

  const params = parseaParams(process.argv.slice(2));

  controller.get(params).then((result) => {
    return console.log(result);
  });
}

main();
