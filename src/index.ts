
//import * as minimist from "minimist";
import { PelisController } from "./controllers";
import minimist from 'minimist';

function parseaParams(argv) {
  const resultado = minimist(argv);

  return {
    action: resultado._[0], // Accede a la acción directamente
    params: {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    },
    _: resultado._ // Asegúrate de incluir esto
  };
}
//define los metodos a ejecutar segun el params que viene desde consola
function proceso(params) {
  const controller = new PelisController();

  if (params._[0] === "add") {
    const tags = Array.isArray(params.params.tags) ? params.params.tags : [params.params.tags];
    const peliNueva = {
      id: params.params.id,
      title: params.params.title,
      tags: tags,
    };
    
    controller.add(peliNueva).then((resultado) => {
      console.log("Película agregada:", resultado);
    });
  }

  if (params._[0] === "get") {
    const objeto = {
      id: params._[1],
    };
    controller.get(objeto).then((respuesta) => {
      console.log(respuesta);
    });
  }

  if (params._[0] === "search") {
    const objeto = {
      search: {
        title: params.params.title,
        tag: params.params.tag,
      },
    };

    controller.get(objeto).then((respuesta) => {
      console.log(respuesta);
    });
  }

  if (params._[0] === undefined) {
    controller.get({}).then((respuesta) => {
      console.log(respuesta);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  proceso(params);
}

main();
