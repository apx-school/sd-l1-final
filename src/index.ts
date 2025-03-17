import minimist from "minimist";
import { PelisController } from "./controllers";

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    if (!args.id || !args.title) {
      console.error("Error: Se requieren --id y --title para agregar una película.");
      return;
    }
    const nuevaPeli = { id: Number(args.id), title: args.title, tags: args.tags ? [].concat(args.tags) : [] };
    const resultado = await controller.add(nuevaPeli);
    console.log(resultado ? "Película agregada exitosamente." : "No se pudo agregar la película.");
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
