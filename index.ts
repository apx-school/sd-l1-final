import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

type SearchMovieParameters = {
  search?: {
    title?: string | null;
    tag?: string | null;
  };
};

type ConsoleActions = {
  action?: "add" | "get" | "search" | null;
  id?: number | null;
  addPeliData?: Peli;
  options?: SearchMovieParameters | null;
};

function parseaParams(argv) {
  const input = minimist(argv);

  // _Array tendrá lo que trae la propiedad _ de minimist, básicamente la opción que me pasan por consola, pudiendo ser...
  // []: pide todas las películas
  // ['get', ID]: pide una película, e ID es el ID de la película
  // ['search']: pide buscar una película por title y/o tag (eso lo tomo por otro lado)
  // ['add']: pide agregar una película, recibo id/title/tags por otro lado

  const _Array = input._;

  let params: ConsoleActions;

  // si _Array está vacío, pidieron todas las películas
  if (_Array.length === 0) {
    params = {
      action: null,
    };
  }

  // si _Array tiene get, pidieron una película en particular
  if (_Array.length === 2) {
    params = {
      action: _Array[0],
      id: _Array[1],
    };
  }

  // si _Array tiene un elemento, pidieron buscar o agregar una película
  if (_Array.length === 1) {
    if (_Array[0] === "add") {
      params = {
        action: _Array[0],
        addPeliData: {
          id: input.id,
          title: input.title,
          tags: input.tags,
          rating: input.rating,
          starring: input.starring,
          year: input.year,
          length: input.length,
          streamingService: input.streamingService
        },
      };
    } else if (_Array[0] === "search") {
      params = {
        action: _Array[0],
        options: {
          search: {
            title: input.title,
            tag: input.tag,
          },
        },
      };
    } else params = {};
  }
  return params;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();

  switch (params.action) {
    case null:
      pelisController.get().then((todasLasPelis) => console.log(todasLasPelis));
      break;
    case "get":
      pelisController
        .get(params)
        .then((peliBuscada) => console.log(peliBuscada));
      break;
    case "search":
      pelisController
        .get(params.options)
        .then((peliBuscada) => console.log(peliBuscada));
      break;
    case "add":
      pelisController.add(params.addPeliData).then((res) => {
        if (res === false) {
          console.log(
            "La película no pudo ser añadida (error de escritura o película ya existente)."
          );
        } else {
          console.log("Película añadida correctamente.");
        }
      });
      break;
    default:
      console.log("Parámetros incorrectos.");
      break;
  }
}

main();
