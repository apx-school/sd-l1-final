import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: string[]) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params._[0] === "add") {
    const peli = {
      id: Number(params.id),
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags].filter(Boolean),
    };
    const result = await controller.add(peli);
    console.log(result ? "Película agregada." : "Error al agregar la película.");
  } else if (params._[0] === "get") {
    const options = { id: params._[1] ? Number(params._[1]) : undefined };
    const pelis = await controller.get(options);
    console.log(pelis.length > 0 ? pelis : "No se encontraron películas.");
  } else if (params._[0] === "search") {
    const options = {
      search: {
        title: params.title,
        tag: params.tag,
      },
    };
    const pelis = await controller.get(options);
    console.log(pelis.length > 0 ? pelis : "No se encontraron películas.");
  } else {
    const pelis = await controller.get({});
    console.log(pelis);
  }
}

main();

