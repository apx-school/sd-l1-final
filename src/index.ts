import minimist from "minimist";
import { PelisController } from "./controllers";

async function main() {
  const controller = new PelisController();
  const args = minimist(process.argv.slice(2));

  const comando = args._[0];

  if (comando === "add") {
    const peli = {
      id: args.id,
      title: args.title,
      tags: Array.isArray(args.tags) ? args.tags : [args.tags],
    };
    const resultado = await controller.add(peli);
    console.log("Peli agregada:", resultado);
  } else if (comando === "get") {
    const peli = await controller.getOne({ id: Number(args._[1]) });
    console.log(peli);
  } else if (comando === "search") {
    const pelis = await controller.get({ search: { title: args.title, tag: args.tag } });
    console.log(pelis);
  } else {
    const pelis = await controller.get();
    console.log(pelis);
  }
}

main();