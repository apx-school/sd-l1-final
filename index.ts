import * as minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}
function ejector(parametro) {
  const pelisController = new PelisController

  if (parametro._ == "search") {
    pelisController.get({ search: { title: parametro.title, tag: parametro.tag } }).then((peli) => {
      return peli;
    })
  } else if (parametro._ == "add") {
    console.log("Haz agregado una pelicula", parametro.title);
    delete parametro._
    pelisController.add(parametro);
  } else if (parametro._ == "get") {
    pelisController.get({ get: { id: parametro._[1] } })
  }
  else return pelisController.get(parametro).then((peli) => { console.log(peli) });
}
function main() {
  const parametro = parseaParams(process.argv.slice(2));
  console.log(parametro)
  ejector(parametro)
}

main();
