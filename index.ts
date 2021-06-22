import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultadoMinimist = minimist(argv);

  return resultadoMinimist;
}
function ejecutador(parametros) {
  const controllerPelis = new PelisController();
  if (parametros._ == "search") {
    controllerPelis
      .get({ search: { title: parametros.title, tag: parametros.tag } })
      .then((resp) => {
        console.log(resp);
      });
  } else if (parametros._ == "add") {
    console.log(parametros.title);
    delete parametros._;
    controllerPelis.add(parametros);
  } else if (parametros._[0] == "get") {
    return controllerPelis.get({ id: parametros._[1] }).then((resp) => {
      console.log(resp);
    });
  } else {
    return controllerPelis.pelis.getAll().then((resp) => {
      console.log(resp);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  ejecutador(params);
}

main();
