import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  let params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController();

  if (params._[0] == "get") {
    const idSearched = params._[1];
    peliController.get({ id: idSearched }).then((res) => {
      console.log(res);
    });
  }

  if (params._.length < 1) {
    peliController.get(null).then((res) => {
      console.log(res);
    });
  }

  if (params._[0] == "search") {
    const buscado = {
      search: {
        title: params.title,
        tags: params.tag,
      },
    };
    peliController.get(buscado).then((res) => {
      console.log(res);
    });
  }

  if (params._[0] == "add") {
    const added = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    const respuesta = peliController.add(added);
    respuesta.then((res) => {
      res
        ? console.table(res)
        : console.error(
            "Error, la pelicula que intenta agregar ya se encuentra en el listado"
          );
    });
  }
}

main();
