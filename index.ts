import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  const options: any = {};

  if (resultado._ == "search") {
    options.search = {};
    if (resultado.title) {
      options.search.title = resultado.title;
    }
    if (resultado.tag) {
      options.search.tag = resultado.tag;
    }
  }
  if (resultado._[0] == "get") {
    options.id = resultado._[1];
  }
  if (resultado._ == "add") {
    options.id = resultado.id;
    options.title = resultado.title;
    options.tags = resultado.tags;
  }

  return options;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliculasController = new PelisController();
  if (params.id && params.title && params.tags) {
    peliculasController.add(params).then((resultado) => {
      console.log(resultado);
    });
  } else {
    const promesa = peliculasController.get(params).then((resultado) => {
      console.log(resultado);
    });
  }
}

main();
