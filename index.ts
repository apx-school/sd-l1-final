import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  ejecutador(resultado);
  return resultado;
}

async function ejecutador(params) {
  const controller = new PelisController();
  if (params._[0] == "search") {
    return controller.get({ search: params });
  }
  if (params._[0] == "get") {
    return controller.get({ id: params._[1] });
  }
  if (params._[0] == "add") {
    return controller.add(params).then((respuesta) => {
      return respuesta;
    });
  }
  return controller.collection.getAll();
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutador(params).then((res) => {
    console.log(res);
  });
}

main();
