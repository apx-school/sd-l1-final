import * as minimist from "minimist";
import { PelisCollection, Peli } from "./models";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  var opcion;
  if (resultado._[0] == "search") {
    opcion = "search";
    var search = { title: resultado.title, tag: resultado.tag };
  }
  if (resultado._[0] == "get" && resultado._[1]) {
    opcion = "get";
    var id = resultado._[1];
  }
  if (resultado._[0] == "add") {
    opcion = "add";
    var add = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  }

  return {
    accion: opcion,
    add,
    id,
    search,
  };
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  //console.log(params);

  if (params.accion == "search") {
    controller.get(params).then((resultado) => {
      console.log(resultado);
    });
  }
  if (params.accion == "get") {
    controller.get(params).then((resultado) => {
      console.log(resultado);
    });
  }
  if (params.accion == "add") {
    controller.add(params.add); /*.then(() => {
      controller.listaPelis.getAll().then((todasLasPelis) => {
        console.log(todasLasPelis);
      });
    });*/
  }
}

main();
