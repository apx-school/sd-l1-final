import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const controller = new PelisController();
  const resultado = minimist(argv);
  if (resultado._[0] == "add") {
    return controller
      .add({
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      })
      .then((res) => {
        return res;
      });
  }
  if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search") {
    if (resultado.title && resultado.tag) {
      return { search: { title: resultado.title, tag: resultado.tag } };
    } else if (resultado.title) {
      return { search: { title: resultado.title } };
    } else if (resultado.tag) {
      return { search: { tag: resultado.tag } };
    }
  }
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliculas = new PelisController();
  peliculas.get(params).then((respuesta) => {
    console.log(respuesta);
  });
}
main();
