import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controlador = new PelisController();

  if (params._[0] == "get") {
    let idPeli = params._[1];
    return controlador.get({ id: idPeli }).then((x) => console.log(x));
  } else if (params._[0] == "search") {
    delete params._;
    return controlador.pelis.search(params).then((x) => console.log(x));
  } else if (params._[0] == "add") {
    delete params._;
    return controlador.pelis.add(params).then((x) => console.log(x));
  } else {
    return controlador.get().then((x) => console.log(x));
  }
}

main();
