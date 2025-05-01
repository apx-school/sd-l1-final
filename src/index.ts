import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const comando = params._[0];

  if (comando === "add") {
    const nuevaPeli = {
      id: params.id,
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };
    const exito = await controller.add(nuevaPeli);
    console.log(exito ? "Película agregada exitosamente." : "Error al agregar la película.");
  } else if (comando === "get") {
    const id = params._[1];
    const peli = await controller.getOne({ id });
    console.log(peli ?? "Película no encontrada.");
  } else if (comando === "search") {
    const searchParams: any = {};
    if (params.title) searchParams.title = params.title;
    if (params.tag) searchParams.tag = params.tag;

    const resultados = await controller.get({ search: searchParams });
    console.log(resultados.length > 0 ? resultados : "No se encontraron películas.");
  } else if (!comando) {
    // Si no hay comando, mostramos todas las pelis
    const todas = await controller.get({});
    console.log(todas);
  } else {
    console.log("Comando no reconocido. Usá add, get o search.");
  }

  // Log para debugging
  // console.log(params);
}

main();
