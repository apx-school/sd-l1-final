import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  const pelisControllers = new PelisController();

  const accion = resultado._;

  const parametros = accion[0];

  if (parametros === "get") {
    return pelisControllers.get({ id: accion[1] });
  } else if (parametros === "search") {
    return pelisControllers.get({ search: resultado });
  } else if (parametros === "add") {
    const peliNueva = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };

    return pelisControllers.add(peliNueva);
  }
  return pelisControllers.peliculas.getAll();
}

async function main() {
  const params = await parseaParams(process.argv.slice(2));
  console.log(params);
}

main();
