import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();

  try {
    if (params._[0] === "add") {
      const nuevaPeli = {
        id: params.id,
        title: params.title,
        tags: params.tags
      };
      await pelisController.add(nuevaPeli);
    } else if (params._[0] === "get") {
      const id = parseInt(params._[1]);
      const result = await pelisController.get({ id });
      console.log("Resultado de la búsqueda por ID:", result);
    } else if (params._[0] === "search") {
      const options = {
        title: params.title,
        tag: params.tag,
      };
      const result = await pelisController.get({ search: options });
      console.log("Resultado de la búsqueda:", result);
    } else {
      const result = await pelisController.get();
      console.log("Todas las películas:", result);
    }
  } catch (error) {
    console.error("Error en el programa:", error);
  }
}

main();
