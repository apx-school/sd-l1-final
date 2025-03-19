import minimist from "minimist";
import { PelisController } from "./controllers";
import {Peli} from "./models";
async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    const peli: Peli = {
      id: Number(args.id),
      title: args.title,
      tags: Array.isArray(args.tags) ? args.tags : [args.tags],
    };
  controller.add(peli).then(succes => {
    console.log(succes ? "¡Peli agregada exitosamente!" : "No se pudo agregar la peli.");
  });
  return;
    }
  else if (args._[0] === "get") {
    const id = Number(args._[1]);
    if (isNaN(id)) {
      console.error("Error: Debes proporcionar un ID válido.");
      return;
    }
    console.log(await controller.get({ id }) || "Película no encontrada.");
  }

  else if (args._[0] === "search") {
    console.log(JSON.stringify(await controller.get({ search: { title: args.title, tag: args.tag } }), null, 2));
  }

  else {
    console.log(JSON.stringify(await controller.get(), null, 2));
  }
}

main();
