import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function processOptions(option) {
  const peliculas = new PelisController();
  if (option._[0] == "get") {
    const peliGet = { id: option._[1] };
    peliculas.get(peliGet).then((p) => {
      return console.log(p);
    });
  } else if (option._[0] == "search") {
    const peliSearch = { search: { title: option.title, tag: option.tag } };
    peliculas.get(peliSearch).then((p) => {
      return console.log(p);
    });
  } else if (option._[0] == "add") {
    const peliAdd = { id: option.id, title: option.title, tags: option.tags };
    peliculas.add(peliAdd);
  } else {
    peliculas.pelisCollection.getAll().then((p) => {
      console.log(p);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  processOptions(params);
}

main();
