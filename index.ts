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
    let res = { action: "esta vacio papurri" };
    return controller.get(res);
  }

  if (resultado._.includes("get")) {
    let res = { id: resultado._[1] };
    return controller.get(res);
  }
  if (resultado._.includes("search")) {
    let res = {
      search: {
        title: resultado.title,
        tag: resultado.tag,
      },
    };
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
