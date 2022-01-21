import * as minimist from "minimist";
import { PelisCollection, Peli } from "./models";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  var opcion;
  if (resultado._[0] == "search") {
    opcion = "search";
  }
  if (resultado._[0] == "get" && resultado._[1]) {
    opcion = "get";
  }
  if (resultado._[0] == "add") {
    opcion = "add";
  }

  return {
    accion: opcion,
    id: resultado.id,
    title: resultado.title,
    tag: resultado.tag,
    tags: resultado.tags,
    buscarId: { id: resultado._[1] },
  };
}

function main() {
  const controller = new PelisController();
  // controller.promesa.then(() => {
  const params = parseaParams(process.argv.slice(2));
  if (params.accion == "search") {
    const paramsSearch = { title: params.title, tags: params.tag };
    controller.get(paramsSearch).then((resultado) => {
      console.log(resultado);
    });
  }
  if (params.accion == "get") {
    controller.get(params.buscarId).then((resultado) => {
      console.log(resultado);
    });
  }
  if (params.accion == "add") {
    const paramsAdd = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    controller.add(paramsAdd).then(() => {
      controller.listaPelis.getAll().then((todasLasPelis) => {
        console.log(todasLasPelis);
      });
    });
  }
  // });
}

main();
