import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist.default(argv);

  if (resultado._[0] === "add") {
    return {
      command: "add",
      id: resultado.id,
      title: resultado.title,
      tags: Array.isArray(resultado.tags) ? resultado.tags : [resultado.tags],
    };
  } else if (resultado._[0] === "get") {
    return {
      command: "search",
      title: resultado.title,
      tag: resultado.tag,
    };
  } else {
    return { command: "all" };
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params.command === "add") {
    const newPeli: Peli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };

    const result = await controller.add(newPeli);

    console.log("Película agregada:", result);
  } else if (params.command === "get") {
    const peli = await controller.getOne({ id: params.id });
    console.log("Película encontrada:", peli);
  } else if (params.command === "search") {
    const searchOptions = {
      search: {
        title: params.title,
        tag: params.tag,
      },
    };

    const results = await controller.get(searchOptions);
    console.log("Resultados de búsqueda:", results);
  } else {
    const allPelis = await controller.get();
    console.log("Todas las películas:", allPelis);
  }
}

main().catch((error) => {
  console.error("Error:", error);
});

main();
