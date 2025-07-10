import minimist from "minimist";
import { PelisController } from "./controllers";


import { Peli } from "./models";

type Action =
  | { action: "get"; id: number }
  | { action: "search"; search: { title?: string; tag?: string } }
  | { action: "add"; peli: Peli }
  | { action: "list" };

function parseaParams(argv: string[]): Action {
  // Usamos minimist para parsear los argumentos de la línea de comandos
  // El primer argumento es el comando, y los siguientes son las opciones
  const args = minimist(argv);
  const [command] = args._;
// Si no hay comando, devolvemos una acción por defecto
  switch (command) {
    case "get":
      // Si el comando es "get", devolvemos una acción para obtener una peli por id
      // Si no se pasa un id, usamos el segundo argumento o el argumento "id"
      return { action: "get", id: Number(args._[1] ?? args.id) };

    case "search":
      // Si el comando es "search", devolvemos una acción para buscar pelis
      // por título o etiqueta. Si no se pasa un título o etiqueta, los dejamos como undefined
      return {
        action: "search",
        search: {
          title: args.title,
          tag: args.tag,
        },
      };

    case "add":
      // Si el comando es "add", devolvemos una acción para agregar una nueva peli
      // Aseguramos que el id sea un número y que title y tags sean cadenas
      return {
        action: "add",
        peli: {
          id: Number(args.id),
          title: args.title,
          tags: String(args.tags).split(",").filter(Boolean),
        },
      };

    default:
      return { action: "list" };
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  switch (params.action) {
    // Dependiendo de la acción, llamamos al método correspondiente del controlador
    // y mostramos el resultado en la consola
    case "get":
      console.log(await controller.getOne({ id: params.id }));
      break;

    case "search":
      console.log(await controller.get({ search: params.search }));
      break;

    case "add":
      console.log(await controller.add(params.peli));
      break;

    case "list":
      console.log(await controller.get());
      break;
  }
}

main();


