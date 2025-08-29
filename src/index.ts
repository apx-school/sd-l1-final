import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params.action === "get") {
    let searchOptions;

    // Parseo de search si existe
    if (params.search) {
      try {
        searchOptions =
          typeof params.search === "string"
            ? JSON.parse(params.search)
            : params.search;
      } catch (e) {
        console.error("Error parseando search:", e);
        searchOptions = {};
      }
    }

    const resultado = await controller.get({
      search: searchOptions,
      id: params.id, // <-- agregamos el id aquí
    });

    console.log(resultado);
  } else if (params.action === "getOne") {
    const resultado = await controller.getOne(params);
    console.log(resultado);
  } else if (params.action === "add") {
    const nuevaPeli = {
      id: params.id,
      title: params.title,
      tags: Array.isArray(params.tags)
        ? params.tags
        : params.tags
        ? [params.tags]
        : [],
    };
    const resultado = await controller.add(nuevaPeli);
    console.log(resultado);
  } else {
    console.log("Acción no reconocida");
  }
}

main();
