import minimist from "minimist";
import { PelisController, Options } from "./controllers";

function parseaParams(argv: string[]): minimist.ParsedArgs {
  return minimist(argv, {
    alias: {
      id: "i",
      search: "s",
      title: "t",
      tag: "g",
      tags: "T",
      add: "a",
    },
  });
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params.id && !params.add && !params.search) {
    // Buscar por ID
    const pelicula = await controller.get({ id: Number(params.id) });
    console.log("Resultado por ID:", pelicula);
  } else if (params.search) {
    // Búsqueda
    const searchOptions: Options["search"] = {};
    if (params.title) searchOptions.title = params.title;
    if (params.tag) searchOptions.tag = params.tag;
    const peliculas = await controller.get({ search: searchOptions });
    console.log("Resultados de la búsqueda:", peliculas);
  } else if (params.add) {
    // Agregar película
    if (!params.id || !params.title) {
      console.error("Se requieren id y title para agregar una película.");
      return;
    }

    // Normalizamos tags para que siempre sea array
    let tags: string[] = [];
    if (params.tags) {
      if (Array.isArray(params.tags)) {
        tags = params.tags;
      } else {
        tags = [params.tags];
      }
    }

    const nuevaPelicula = {
      id: Number(params.id),
      title: params.title,
      tags: tags,
    };

    const resultado = await controller.add(nuevaPelicula);
    console.log(resultado ? "Película agregada con éxito" : "Error: La película ya existe");
  } else {
    // Obtener todas las películas
    const todasLasPeliculas = await controller.get();
    console.log("Todas las películas:", todasLasPeliculas);
  }
}

main();
