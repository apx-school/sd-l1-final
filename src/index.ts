import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: string[]) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const comando = params._[0]; // El primer argumento sin flag es el comando

  if (comando === "add") {
    const peli = {
      id: Number(params.id),
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };
    const resultado = await controller.add(peli);
    console.log("Peli agregada:", resultado);
  } else if (comando === "get") {
    const id = Number(params._[1]);
    const peli = await controller.getOne({ id });
    console.log(peli);
  } else if (comando === "search") {
    const searchOptions: any = {};
    if (params.title) searchOptions.title = params.title;
    if (params.tag) searchOptions.tag = params.tag;

    const pelis = await controller.get({ search: searchOptions });
    console.log(pelis);
  } else {
    // Si no hay comando, devuelve todas las pelis
    const pelis = await controller.get();
    console.log(pelis);
  }
}

main();