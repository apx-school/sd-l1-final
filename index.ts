import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function opcionIngresada(obj) {
  const peliController = new PelisController();

  if (obj._[0] == "get") {
    const idSearched = obj._[1];
    return peliController.get({ id: idSearched }).then((res) => {
      return res;
    });
  }

  if (obj._[0] == "search") {
    const buscado = {
      search: {
        title: obj.title,
        tags: obj.tag,
      },
    };
    return peliController.get(buscado).then((res) => {
      return res;
    });
  }

  if (obj._[0] == "add") {
    const added = {
      id: obj.id,
      title: obj.title,
      tags: obj.tags,
    };
    return peliController.add(added).then((res) => res ? res : "Error, la pelicula que intenta agregar ya se encuentra en el listado");
  }
  return peliController.get(null).then((res) => {
    return res;
  });
}

function main() {
  let params = parseaParams(process.argv.slice(2));
  let resp = opcionIngresada(params);
  resp.then( r => console.log(r));
}

main();
