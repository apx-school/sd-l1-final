import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  const controller = new PelisController();

  const options = resultado._[0];

  if (options == "get") {
    return controller.get({ id: resultado._[1] });
  } else if (options == "search") {
    return controller.get({ search: resultado });
  } else if (options == "add") {
    const maqueta = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
    return controller.add(maqueta);
  }
  return controller.pelis.getAll();
}

async function main() {
  const params = await parseaParams(process.argv.slice(2));

  console.log(params);
}

main();
