import minimist from "minimist";
import { PelisController } from "./controllers";

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    const peli = {
      id: args.id,
      title: args.title,
      tags: args.tags instanceof Array ? args.tags : [args.tags],
    };
    const resultado = await controller.add(peli);
    console.log(resultado);
  } else if (args._[0] === "get") {
    const id = args._[1];
    const resultado = await controller.get({ id: Number(id) });
    console.log(resultado);
  } else if (args._[0] === "search") {
    const search: any = {};
    if (args.title) search.title = args.title;
    if (args.tag) search.tag = args.tag;
    const resultado = await controller.get({ search });
    console.log(resultado);
  } else {
    const resultado = await controller.get();
    console.log(resultado);
  }
}

main();
