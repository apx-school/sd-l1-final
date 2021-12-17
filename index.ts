import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController();
  console.log(params._[1])

  if (params._[0] != "search" && params._[0] != "add" && params._[0] != "get") {
    console.log("hola")
    peliController.get({ id: params._[1] }).then((peli) => {
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
    peliController.add(addPeli);

  } else if (params._[0] == "get") {
    const getPeli = {
      id: params._[1],
    };
    peliController.get(getPeli).then((peli) => {
      console.log(peli);
    });

  } else if (params._[0] == "search") {

    if (params.title && params.tag) {
      const searchPeli = {
        search: {
          tag: params.tag,
          title: params.title,
        },
      };
      peliController.get(searchPeli).then((peli) => {
        console.log(peli);
      });

    } else if (params.title && !params.tag) {
      const respuesta = {
        search: {
          title: params.title,
        },
      };
      peliController.get(respuesta).then((peli) => {
        console.log(peli);
      });
      
    } else if (!params.title && params.tag) {
      const resp = {
        search: {
          tag: params.tag,
        },
      };
      peliController.get(resp).then((peli) => {
        console.log(peli);
      });
    }
  }
}

main();
