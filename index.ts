import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const controller = new PelisController();
  const resultado = minimist(argv);
  if (resultado._ == "add") {
    delete resultado._;
    controller.add(resultado).then((boolean) => console.log(boolean));
  } else if (resultado._[0] == "get") {
    controller.get({ id: resultado._[1] }).then((peli) => console.log(peli));
  } else if (resultado._[0] == "search" && resultado.tag && resultado.title) {
    controller
      .get({ search: { title: resultado.title, tag: resultado.tag } })
      .then((peli) => console.log(peli));
  } else if (resultado._[0] == "search" && resultado.hasOwnProperty("title")) {
    controller
      .get({ search: { title: resultado.title } })
      .then((peli) => console.log(peli));
  } else if (resultado._[0] == "search" && resultado.tag) {
    controller
      .get({ search: { tag: resultado.tag } })
      .then((peli) => console.log(peli));
  } else controller.pelisCollection.getAll().then((peli) => console.log(peli));
  return resultado;
}
function main() {
  const params = parseaParams(process.argv.slice(2));
}

main();
