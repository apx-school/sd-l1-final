import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  const command = params._[0];

  switch (command) {
    case "get":
      const id = params._[1];
      const resultGet = await controller.get({ id });
      console.log(resultGet);
      break;

    case "add":
      if (!params.id || !params.title || !params.tags) {
        console.error("Faltan parámetros: --id, --title, --tags son requeridos.");
        break;
      }
      const newPeli = {
        id: parseInt(params.id),
        title: params.title,
        tags: Array.isArray(params.tags) ? params.tags : [params.tags],
      };
      const resultAdd = await controller.add(newPeli);
      console.log(resultAdd ? "Película agregada con éxito." : "Error al agregar la película o ID duplicado.");
      break;

    case "search":
      const searchOptions: { title?: string; tag?: string } = {};
      if (params.title) {
        searchOptions.title = params.title;
      }
      if (params.tag) {
        searchOptions.tag = params.tag;
      }
      const resultSearch = await controller.get({ search: searchOptions });
      console.log(resultSearch);
      break;

    default:
      const allPelis = await controller.get();
      console.log(allPelis);
      break;
  }
}

main();