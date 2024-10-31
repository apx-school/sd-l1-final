import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();

  if (params._[0] === "add") {
    //agg peliculas
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags || [], // Asegurate que tags sea un array
    };
    const result = await pelisController.add(peli);
    console.log(
      result ? "Pelicula agregada con exito." : "Error al agregar la pelicula."
    );
  } else if (params._[0] === "get") {
    const id = Number(params._[1]); //el segundo argumento es el id
    const peli = await pelisController.get({ id });
    console.log(peli || "Pelicula no encontrada");
  } else if (params._[0] === "search") {
    //busca pelicula por titulo o tag
    const searchOptions = {
      title: params.title,
      tag: params.tag,
    };
    const pelis = await pelisController.get({ search: searchOptions });
    if (Array.isArray(pelis)) {
      console.log(pelis.length > 0 ? pelis : "No se encontraron peliculas.");
    } else {
      console.log(pelis);
    }
  } else {
    const pelis = await pelisController.get();
    if (Array.isArray(pelis)) {
      console.log(pelis);
    } else {
      console.log([pelis]);
    }
  }
}

main();
