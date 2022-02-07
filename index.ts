import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { unset } from "lodash";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const parametros = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  let comando: any = {};
  if (parametros._[0] == "get") {
    comando = { id: parametros._[1] };
    const respuesta = controller.get(comando);
    return respuesta.then((res) => {
      return console.log(res);
    });
  } else if (parametros._[0] == "search") {
    comando = { search: { title: parametros.title, tag: parametros.tag } };
    const respuesta = controller.get(comando);
    return respuesta.then((res) => {
      return console.log(res);
    });
  } else if (parametros._[0] == "add") {
    unset(parametros, "_");
    comando = parametros;
    const respuesta = controller.add(comando);
    return respuesta.then((res) => {
      return console.log(res);
    });
  } else {
    const respuesta = controller.peliculas.getAll();
    return respuesta.then((res) => {
      return console.log(res);
    });
  }
}

main();
