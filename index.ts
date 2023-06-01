import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function optionControl(params) {
  const controller = new PelisController();
  if (params._.includes("add")) {
    return await controller.add({
      id: params.id,
      title: params.title,
      tags: params.tags,
    });
  } else if (params._.includes("get")) {
    return await controller.get({ id: params._[1] });
  } else if (params._.includes("search")) {
    return await controller.get({
      search: { title: params.title, tag: params.tag },
    });
  } else {
    return await controller.pelis.getAll();
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = await optionControl(params);
  console.log(resultado);
}

main();
