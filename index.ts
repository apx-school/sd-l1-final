import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptions(controller, params) {
  if (params._[0] == "add") {
    var nuevaPeli = new Peli();
    nuevaPeli.id = params.id;
    nuevaPeli.title = params.title;
    nuevaPeli.tags = params.tags;
    return await controller.add(nuevaPeli);
  }

  if (params._[0] == "get") {
    var res = await controller.get({ id: params._[1] });
    return res;
  }

  if (params._[0] == "search") {
    var res = await controller.get({ search: params });
    return res;
  }

  if ({}) {
    var res = await controller.get({});
    return res;
  }
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  const resultado = await processOptions(controller, params);
  console.log(resultado);
}

main();
