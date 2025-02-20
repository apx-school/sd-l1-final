import minimist from "minimist";

import { PelisController } from "./controllers";

function parseaParams(argv: string[]) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const command = params._[0];

  try {
    if (command === "add") {
      const peli = {
        id: params.id,
        title: params.title,
        tags: params.tags
          ? Array.isArray(params.tags)
            ? params.tags
            : [params.tags]
          : [],
      };
      const result = await controller.add(peli);
      console.log(
        result
          ? "Película agregada con éxito."
          : "Error al agregar la película."
      );
    } else if (command === "get") {
      const id = Number(params._[1]);
      const peli = await controller.getOne({ id });
      console.log(peli || "Película no encontrada.");
    } else if (command === "search") {
      const pelis = await controller.get({
        search: { title: params.title, tag: params.tag },
      });
      console.log(pelis.length ? pelis : "No se encontraron películas.");
    } else {
      const pelis = await controller.get();
      console.log(pelis);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
