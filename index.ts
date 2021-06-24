import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  const controller = new PelisController();

  if(resultado._ == "add") {
    return controller.add({id:resultado.id, title:resultado.title, tags:resultado.tags});
  } else if(resultado._[0] == "search" && resultado.title && resultado.tag) {
    return {search: {title:resultado.title, tag:resultado.tag}};
  } else if(resultado._[0] == "search" && resultado.title) {
    return {search: {title:resultado.title}};
  } else if(resultado._[0] == "search" && resultado.tag) {
    return {search: {tag:resultado.tag}};
  } else if(resultado._[0] == "get") {
    return {id:resultado._[1]};
  } else {
    return controller.peliculas.getAll();
  }
};

function main() {
const params = (process.argv.slice(2));
const parseado = parseaParams(params);
const pelisController = new PelisController();
pelisController.get(parseado).then((resultado) => {
  console.log(resultado);
})
}

main();
