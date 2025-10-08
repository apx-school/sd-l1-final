/*

import minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);
}

main();

*/

import minimist from "minimist";
import { PelisController } from "./controllers";

const controller = new PelisController();

function parseaParams(argv) {
  return minimist(argv);
}

async function main() {
  const args = parseaParams(process.argv.slice(2));
  const comando = args._[0]; // El primer argumento después del script, ejemplo: 'add', 'get' o 'search'

  switch (comando) {
    case "add":
      // Crear peli con los datos de args
      const nuevaPeli = {
        id: Number(args.id),
        title: args.title,
        tags: Array.isArray(args.tags) ? args.tags : [args.tags], // asegurarse que sea array
      };
      const resultadoAdd = await controller.add(nuevaPeli);
      console.log(`¿Se agregó la película? ${resultadoAdd}`);
      break;

    case "get":
      // Buscar por id
      const peliPorId = await controller.get({ id: Number(args._[1]) });
      console.log(peliPorId);
      break;

    case "search":
      // Buscar por título y/o tag
      const searchOptions: any = {};
      if (args.title) searchOptions.search = { title: args.title };
      if (args.tag) {
        if (!searchOptions.search) searchOptions.search = {};
        searchOptions.search.tag = args.tag;
      }
      const resultadosBusqueda = await controller.get(searchOptions);
      console.log(resultadosBusqueda);
      break;

    default:
      // Mostrar todas las películas
      const todas = await controller.get();
      console.log(todas);
      break;
  }
}

main();
