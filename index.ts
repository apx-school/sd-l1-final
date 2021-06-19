import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection, Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}
function ejector(params) {
  const pelisController = new PelisController

  if (params._ == "search") {
    pelisController.get({ search: { title: params.title, tag: params.tag } }).then((p) => {
      return p;
    })
  } else if (params._ == "add") {
    console.log("Haz agregado una pelicula", params.title);
    delete params._
    pelisController.add(params);
  } else return pelisController.get(params).then((p) => {
    return p;
  })
}
function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params)
  ejector(params)
}
main();
