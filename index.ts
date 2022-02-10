import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { unset } from "lodash";
import { isEmpty } from "lodash";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function ejecutarParams(parametros) {
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
    unset(parametros, "_"); //Remueve la key _ dejando solamente el objeto con la pelicula a agregar
    comando = parametros;
    const respuesta = controller.add(comando);
    return respuesta.then((res) => {
      return console.log(res);
    });
  } else if (isEmpty(parametros._)) {
    const respuesta = controller.peliculas.getAll();
    return respuesta.then((res) => {
      return console.log(res);
    });
  }
}

function main() {
  const parametros = parseaParams(process.argv.slice(2));
  ejecutarParams(parametros);
}

main();
