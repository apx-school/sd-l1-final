import { PelisController } from "./controllers";
import { Peli } from "./models";
import Minimist from "minimist";

function parseaParams(argv: string[]) {
  return Minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const command = params._[0];

  const id = params.id;
  const title = params.title;
  const tags = params.tags;

  const controller = new PelisController();

  if (command === "add") {
    const nuevaPeli: Peli = {
      id,
      title,
      tags: Array.isArray(tags) ? tags : [tags]
    };

    const resultado = await controller.add(nuevaPeli);
    console.log(resultado);
  }

  if (command === "get") {
    const resultado = await controller.getOne({ id });
    console.log(resultado);
  }

  if (command === "search") {
    const searchOptions: any = {};
    if (title) searchOptions.title = title;
    if (tags) searchOptions.tag = tags;

    const resultado = await controller.get({ search: searchOptions });
    console.log(resultado);
  }

  if (!command) {
    const resultado = await controller.get();
    console.log(resultado);
  }
}

main();