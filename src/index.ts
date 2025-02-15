import { PelisController, Options } from "./controllers";
import { Peli } from "./models";
import minimist from "minimist";

function armarObjetoAProcesar(parametroParseado) {
  const action = parametroParseado._[0]; // 'add', 'get', 'search' o undefined // aprovecho la salida de minimist
  let objetoADevolver = {};

  switch (action) {
    case "add":
      // Verificamos si hay propiedades para crear un objeto de tipo Peli
      if (parametroParseado.title && parametroParseado.tags) {
        objetoADevolver = {
          id: parametroParseado.id,
          title: parametroParseado.title,
          tags: Array.isArray(parametroParseado.tags)
            ? parametroParseado.tags
            : [parametroParseado.tags],
        } as Peli;
      }
      break;

    case "get":
      // Si se pasa 'get', devolvemos un objeto de tipo Options que busque por el id de la posicion 1
      const id = parametroParseado._[1]
      if (id) {
        objetoADevolver = { id: id, search: {} //se agrega search para que el controller pueda identificar el tipo
       } as Options;
      } else {
        objetoADevolver = {}; // Si no hay id, devolvemos un objeto vacío
      }
      break;

    case "search":
      // Si se pasa 'search', devolvemos un objeto de tipo Options
      objetoADevolver = {
        search: {
          title: parametroParseado.title,
          tag: parametroParseado.tag,
        } as Options,
      };
      break;

    default:
      // Si no hay acción, devolvemos un objeto vacío
      objetoADevolver = {};
      break;
  }

  return objetoADevolver;
}

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log(resultado);

  return armarObjetoAProcesar(resultado);
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();
  console.log(params);

  pelisController.processOptions(params).then((resultado) => {

    console.log(resultado);
  }).catch((error) => {
    console.error("Error en processOptions:", error);
  });
}

main();
