import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  const movieControllers = new PelisController();

  const accion = resultado._;

  const parametros = accion[0]

  if (parametros == "get") {

    return movieControllers.get({ id: accion[1] })
    
  } else if (parametros == "search") {

    return movieControllers.get({ search:resultado });
    
  } else if (parametros === "add") {
    const newMovie = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags
    }
    
    return movieControllers.add(newMovie);
  }
    return movieControllers.movies.getAll();
  
}

async function main() {
  const params = await parseaParams(process.argv.slice(2));
  console.log( params);
}

main();

