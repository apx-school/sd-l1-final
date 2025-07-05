import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function manejarComando(params, controller) {
  let resultado = null;

  if (params._[0] === "add") {
    resultado = await controller.add({
      id: params.id,
      title: params.title,
      tags: params.tags,
    });
  } else if (params._[0] === "search") {
    if (params.tag && params.title) {
      resultado = await controller.get({
        search: { title: params.title, tag: params.tag },
      });
    } else if (params.title) {
      resultado = await controller.get({ search: { title: params.title } });
    } else if (params.tag) {
      resultado = await controller.get({ search: { tag: params.tag } });
    }
  } else if (params._[0] === "get") {
    resultado = await controller.get({ id: params._[1] });
  } else {
    resultado = await controller.get();
  }

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const resultado = await manejarComando(params, controller);
  console.log(resultado);
}

main();
