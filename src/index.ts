import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const controller = new PelisController();

  const params = parseaParams(process.argv.slice(2));

  const comando = params._[0];

  let respuesta;

  if (comando == "add") {
    respuesta = await controller.add({
      id: Number(params.id),
      title: params.title,
      tags: Array.isArray(params.tags)
        ? params.tags
        : [params.tags],
    });
  } else if (comando == "get") {
    respuesta = await controller.get({
      id: Number(params._[1]),
    });
  } else if (comando == "search") {
    respuesta = await controller.get({
      search: {
        title: params.title,
        tag: params.tag,
      },
    });
  } else {
    respuesta = await controller.get();
  }

  console.log(respuesta);
}

main();