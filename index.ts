import { PelisController } from "./controllers";
import * as minimist from "minimist";
import * as vacio from "lodash/isEmpty";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function proccesOptions(resultado) {
  const controller = new PelisController();

  if (vacio(resultado._)) {
    let res = { action: "esta vacio" };
    return controller.get(res);
  }

  if (resultado._.includes("get")) {
    let res = { id: resultado._[1] };
    return controller.get(res);
  }
  if (resultado._.includes("search") && resultado.title) {
    let res = { title: resultado.title };
    return controller.get(res);
  }
  if (resultado._.includes("search") && resultado.tag) {
    let res = { tags: resultado.tag };
    return controller.get(res);
  }
  if (resultado._.includes("search") && resultado.tag && resultado.title) {
    let res = { tags: resultado.tags, title: resultado.title };
    return controller.get(res);
  }

  if (resultado._[0] == "add") {
    let res = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
    return controller.add(res);
  }
}

function main() {
  const res = parseaParams(process.argv.slice(2));
  const resultado = proccesOptions(res);
  resultado.then((res) => {
    console.table(res);
  });
}
main();
