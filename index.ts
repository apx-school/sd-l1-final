import * as minimist from "minimist";
import { PelisController } from "./controllers";
/*  import { Peli } from "./models";*/

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  {
    const controller = new PelisController();

    const parametros = parseaParams(process.argv.slice(2));
    if (parametros._[0] == "search" && parametros.title && parametros.tag) {
      return controller
        .get({ search: { title: parametros.title, tag: parametros.tag } })
        .then((resultado) => resultado);
    } else if (parametros._[0] == "search" && parametros.title) {
      return controller
        .get({ search: { title: parametros.title } })
        .then((resultado) => resultado);
    } else if (parametros._[0] == "search" && parametros.tag) {
      return controller
        .get({ search: { tag: parametros.tag } })
        .then((resultado) => resultado);
    }
    console.log(parametros);
  }
}

main();
