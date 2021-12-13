import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const bandera = Object.keys(params)[0] == "_";
  console.log(bandera);

  const obj = new PelisController();

  if (bandera == true) {
    obj.get().then((peli) => {
      peli.forEach((element) => {
        console.log(element);
      });
    });
  }

  if (params._[0] == "add") {
    const opcion = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };

    obj.add(opcion);
  } else if (params._[0] == "get") {
    const opcion = {
      id: params._[1],
    };
    obj.get(opcion).then((peli) => {
      console.log(peli);
    });
  } else if (params._[0] == "search") {
    if (params.title && params.tag) {
      const opcion = {
        search: {
          tags: params.tag,
          title: params.title,
        },
      };
      obj.get(opcion).then((peli) => {
        console.log(peli);
      });
    } else if (params.title && !params.tag) {
      const opcion = {
        search: {
          title: params.title,
        },
      };
      obj.get(opcion).then((peli) => {
        console.log(peli);
      });
    } else if (!params.title && params.tag) {
      const opcion = {
        search: {
          tags: params.tag,
        },
      };
      obj.get(opcion).then((peli) => {
        console.log(peli);
      });
    }
  }
}

main();
