import * as minimist from "minimist";
import { PelisController } from "./controllers";

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  // Ejemplos de entrada:
  // 1) ts-node index.ts add --id=123 --title="Nueva Peli" --tags=action --tags=classic
  // 2) ts-node index.ts get 123
  // 3) ts-node index.ts search --title="a"
  // 4) ts-node index.ts search --tag="classic"
  // 5) ts-node index.ts search --title="X" --tag="action"
  // 6) ts-node index.ts (devuelve todas las pelis)

  // Detectamos comando principal
  const command = args._[0];

  if (command == "add") {
    // Se asume que "tags" puede venir como string o array => si es un string lo convertimos en array.
    const tags = Array.isArray(args.tags) ? args.tags : [args.tags];

    const peli = {
      id: args.id,
      title: args.title,
      tags: tags,
    };

    const result = await controller.add(peli);
    console.log("Peli agregada:", result);
  } else if (command == "get") {
    // Aquí se asume que el segundo parámetro en _[] es el id
    const id = parseInt(args._[1]);
    const result = await controller.get({ id: id });
    console.log(result);
  } else if (command == "search") {
    const searchOptions: any = {};
    if (args.title) searchOptions.title = args.title;
    if (args.tag) searchOptions.tag = args.tag;

    const result = await controller.get({ search: searchOptions });
    console.log(result);
  } else {
    // Sin comando => devolvemos todas
    const result = await controller.get();
    console.log(result);
  }
}

main();
