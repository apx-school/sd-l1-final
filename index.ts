import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  
  return resultado;
}

function opcionIngresada(objeto) {
  const peliController = new PelisController();

  if (objeto._[0] == "get") {
    const idSearched = objeto._[1]
    return peliController.get({ id: idSearched }).then((res) => {
      return res;
    });
  }

  if (objeto._[0] == "search") {
    const buscado = {
      search: {
        title: objeto.title,
        tags: objeto.tag,
      },
    };
    return peliController.get(buscado).then((res) => {
      return res
    });
  }

  if (objeto._[0] == "add") {
    const added = {
      id: objeto.id,
      title: objeto.title,
      tags: objeto.tags,
    };
    return peliController.add(added).then((res) => res ? res : "Error, la pelicula que intenta agregar ya se encuentra en el listado")
  }
  return peliController.get(null).then((res) => {
    return res
  });
}
function main() {
  const params = parseaParams(process.argv.slice(2))
  let resp = opcionIngresada(params)
  resp.then( r => console.log(r))
}

main();
