import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController();

  if (params._[0] != "search" && params._[0] != "add" && params._[0] != "get") {
    return peliController.get({ id: params._[1] }).then((peli) => {
      peli.forEach((p) => {
        console.log(p);
      });
    });
  }

  if (params._[0] == "add") {
    const addPeli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    return peliController.add(addPeli);
  }

  if (params._[0] == "get") {
    const getPeli = {
      id: params._[1],
    };
    return peliController.get(getPeli).then((peli) => {
      console.log(peli);
    });
  }

  if (params._[0] == "search") {
    if (params.title && params.tag) {
      const searchPeli = {
        search: {
          tag: params.tag,
          title: params.title,
        },
      };
      return peliController.get(searchPeli).then((peli) => {
        console.log(peli);
      });
    }
    if (params.title && !params.tag) {
      const respuesta = {
        search: {
          title: params.title,
        },
      };
      return peliController.get(respuesta).then((peli) => {
        console.log(peli);
      });
    }
    if (!params.title && params.tag) {
      const resp = {
        search: {
          tag: params.tag,
        },
      };
      return peliController.get(resp).then((peli) => {
        console.log(peli);
      });
    }
  }
}

main();
