import * as minimist from "minimist";
import { PelisController } from "./controllers";

async function parseaParams(argv) {
  const controller = new PelisController();
  const resultado = minimist(argv);
  const accion = resultado._[0];
  if (accion === "get") return controller.get({ id: resultado._[1] });
  if (accion === "add") {
    return controller.add({
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    });
  }
  if (accion === "search") return controller.get({ search: resultado });
  else return controller.data.getAll();
}

async function main() {
  const params = await parseaParams(process.argv.slice(2));

  console.log(params);
}

main();
