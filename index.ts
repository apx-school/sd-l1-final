import * as minimist from "minimist";
import { PelisController } from "./controllers";

let esAdd = false;
let esGet = false;
let esSearch = false;
let esVacio = false;

function parseaParams(parametros) {
  const argv = minimist(parametros);
  const opcionStrg = argv._.toString();
  if (opcionStrg == "") {
    return (esVacio = true);
  }
  if (opcionStrg == "add") {
    const peli = { id: argv.id, title: argv.title, tags: argv.tags };
    esAdd = true;
    return peli;
  }
  if (opcionStrg.startsWith("get")) {
    const id = argv._[1];
    esGet = true;
    return id;
  }
  if (opcionStrg == "search") {
    esSearch = true;
    if (argv.title && argv.tag) {
      return { title: argv.title, tags: argv.tag };
    } else if (argv.title) {
      return { title: argv.title };
    } else if (argv.tag) {
      return { tag: argv.tag };
    }
  }
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  if (esAdd) {
    const promesaAdd = controller.add(params);
    promesaAdd.then((x) => {
      if (x == true) {
        console.log("La pelicula se guardo correctamente!");
      } else {
        console.log("El ID ya existe! Pruebe con otro ID");
      }
    });
  }
  if (esGet) {
    const promesaGet = controller.get({ id: params });
    promesaGet.then((x) => {
      console.log(x);
    });
  }
  if (esSearch) {
    const promesaSearch = controller.get({ search: params });
    promesaSearch.then((x) => {
      console.table(x);
    });
  }
  if (esVacio) {
    const promesaVacio = controller.get(esVacio);
    promesaVacio.then((x) => {
      console.table(x);
    });
  }
}

main();
