import * as minimist from "minimist";
import {PelisController} from "./controllers"
import {PelisCollection, Peli} from "./models"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisCollection = new PelisCollection();
  if (params._ == "search") {
    console.log("El parametro llega asi:", params )
//     if (params.title && params.tag) {
//       return { search: {title: params.title, tag: params.tag} };
//     } else if (params.tag) {
//       return { search: { tag: params.tag } };
//     } else if (params.title) {
//       return { serach: { title: params.title }};
//     } else return {}; 
}
}
main();
