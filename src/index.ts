import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params._.length === 0) {
    // Sin comandos, mostrar todas las pelis
    const pelis = await controller.get();
    console.log(pelis);
  } else if (params._[0] === "add") {
    // Agregar peli
    const newPeli = {
      id: params.id,
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };
    const result = await controller.add(newPeli);
    if (result) {
      console.log("Película agregada exitosamente:", newPeli);
    } else {
      console.log("No se pudo agregar la película. Puede que ya exista.");
    }
  } else if (params._[0] === "get") {
    // Buscar por id
    const id = Number(params._[1]);
    if (!isNaN(id)) {
      const peli = await controller.get({ id });
      console.log(peli);
    } else {
      console.log("Id inválido");
    }
  } else if (params._[0] === "search") {
    // Buscar por título y/o tag
    const searchOptions = {};
    if (params.title) searchOptions["title"] = params.title;
    if (params.tag) searchOptions["tag"] = params.tag;

    const pelis = await controller.get({ search: searchOptions });
    console.log(pelis);
  } else {
    console.log("Parámetros no manejados aún:", params);
  }
}

main();

// node src/index.js --id 1 --title "Peli Nueva" --tags "accion" --tags "comedia"