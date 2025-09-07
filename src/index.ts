import minimist from "minimist";
import { PelisController } from "./controllers";
import { SearchOptions } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));

  const controller = new PelisController();

  if (params._[0] === "add") {
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    const resultado = await controller.add(peli);
    console.log(resultado ? "Peli agregada" : "Error al agregar la peli");
  } else if (params._[0] === "get") {
    const peli = await controller.get({ id: params._[1] });
    console.log(peli);
  } else if (params._[0] === "search") {
    const options: SearchOptions = {};
    if (params.title) options.title = params.title;
    if (params.tag) options.tag = params.tag;
    const resultados = await controller.get({ search: options });
    console.log(resultados);
  } else {
    const todasLasPelis = await controller.get({});
    console.log(todasLasPelis);
  }
}

main();
