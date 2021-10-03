import * as minimist from "minimist";
import { PelisController } from "./controllers";

function paramsMinimist(argv) {
  const resultadoMinimist = minimist(argv);
  return resultadoMinimist;
}

function parseaParamsTerminal(parametros, instancia) {
  if (parametros._[0] == "add") {
    return instancia.add(parametros).then((res) => res);

  } else if (parametros._[0] == "get" && typeof parametros._[1] == "number") {
    return instancia.get({ id: parametros._[1] }).then((res) => res);

  } else if (parametros._[0] == "search" && parametros.title) {
    return instancia.get({ search: { title: parametros.title } }).then((res) => res);

  } else if (parametros._[0] == "search" && parametros.tag) {
    return instancia.get({ search: { tag: parametros.tag } }).then((res) => res);

  } else if (
    parametros._[0] == "search" && parametros.title && parametros.tag) {
    return instancia.get({ search: { title: parametros.title, tag: parametros.tag } }).then((res) => res);

  } else if (parametros._.length == 0) {
    return instancia.get({}).then((res) => res);
  }
}

function main() {
  const controller = new PelisController();
  const params = paramsMinimist(process.argv.slice(2));
  parseaParamsTerminal(params, controller).then((res) => {
    console.log(res);
  });
}
main();

