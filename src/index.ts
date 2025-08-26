import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const comando = params._[0];

  try {
    if (comando === "add") {
      // Comando: npx tsx ./src/index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
      const id = parseInt(params.id);
      const title = params.title;
      const tags = Array.isArray(params.tags) ? params.tags : [params.tags];

      const resultado = await controller.add({ id, title, tags });
      if (resultado) {
        console.log("Película agregada exitosamente");
      } else {
        console.log("No se pudo agregar la película (ID duplicado o error)");
      }
    } else if (comando === "get") {
      // Comando: npx tsx ./src/index.ts get 4411
      const id = parseInt(params._[1]);
      const peli = await controller.getOne({ id });

      if (peli) {
        console.log(peli);
      } else {
        console.log("Película no encontrada");
      }
    } else if (comando === "search") {
      // Comandos de búsqueda:
      // npx tsx ./src/index.ts search --title="a"
      // npx tsx ./src/index.ts search --tag="classic"
      // npx tsx ./src/index.ts search --title="x" --tag="action"

      const searchOptions: any = {};

      if (params.title) {
        searchOptions.title = params.title;
      }

      if (params.tag) {
        searchOptions.tag = params.tag;
      }

      const pelis = await controller.get({ search: searchOptions });
      console.log(pelis);
    } else {
      // Comando sin parámetros: npx tsx ./src/index.ts
      // Devuelve todas las películas
      const todasLasPelis = await controller.get();
      console.log(todasLasPelis);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
