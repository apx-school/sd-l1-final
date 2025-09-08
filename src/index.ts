import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  const comando = resultado._[0];

  if (comando === "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  }

  if (comando === "get") {
    return { id: resultado._[1] };
  }

  if (comando === "search") {
    return { search: { title: resultado.title, tag: resultado.tag } };
  }
  return "comando erroneo";
}

async function connector(params) {
  // se instancia la clase PelisController
  const controller = new PelisController();
  if (params === "comando erroneo") {
    console.error(params);
    const allPelis = await controller.model.getAll();
    return console.log(allPelis);
  }
  // si los parametros tienen un id y search significa que se agregara una nueva peli
  else if (params.id && params.title) {
    await controller.add(params);
    // si los parametros tiene solo un id significa que se buscara una peli
  } else if (params.id) {
    const peli = await controller.getOne(params);
    console.log(peli);

    // si los parametros tienen search.title o search.tag, se procede a realizar la busqueda
  } else if (params.search) {
    const resultado = await controller.get(params);
    console.log(resultado);
  }
}

async function main() {
  // se le pasa a la función parseaParams el contenido del array process.argv.slice(2) que son los argumentos
  const params = parseaParams(process.argv.slice(2));
  await connector(params);
}

main();
