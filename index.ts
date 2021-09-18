import * as minimist from "minimist";
import { Peli } from "./models";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultadoMinimist = minimist(argv);
  return resultadoMinimist;
}

function paramAdd(res) {
  let resultado: Peli;

  if (res._[0] == "add") {
    resultado = {
      id: res.id,
      title: res.title,
      tags: res.tags,
    };
    return resultado;
  }
}

function paramGet(res) {
  if (res._[0] == "get") {
    return { id: res._[1] };
  } else if (res._[0] == "search") {
    if (res.title && res.tag) {
      return {
        search: {
          title: res.title,
          tag: res.tag,
        },
      };
    } else if (res.title) {
      return {
        search: {
          title: res.title,
        },
      };
    } else if (res.tag) {
      return {
        search: {
          tag: res.tag,
        },
      };
    }
  } else {
    return {};
  }
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  if (params._[0] == "add") {
    const objetoParams = paramAdd(params);
    const resultado = controller.add(objetoParams);
    resultado.then(() => console.log("Pelicula agregada  correctamente"));
  } else {
    const objetoParams = paramGet(params);
    const resultado = controller.get(objetoParams);
    resultado.then((r) => console.log(r));
  }
}

main();
