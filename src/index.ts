import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const argumentos = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  if (argumentos._[0] === "add") {
    const newPeli: Peli = {
      id: argumentos.id,
      title: argumentos.title,
      tags: Array.isArray(argumentos.tags)
        ? argumentos.tags
        : [argumentos.tags],
    };
    const resultado = await controller.add(newPeli);
    console.log(resultado ? "Pelicula agregada" : "Error al agregar pelicula ");
  } else if (argumentos._[0] === "get") {
    const id = parseInt(argumentos._[1]);
    const resultado = await controller.get({ id });
    console.log(resultado);
  } else if (argumentos._[0] === "search") {
    const searchOptions = {};
    if (argumentos.title) {
      searchOptions["title"] = argumentos.title;
      console.log("search index ", searchOptions);
    }
    if (argumentos.tag) {
      searchOptions["tag"] = argumentos.tag;
      console.log("search tag ", searchOptions);
    }
    const resultado = await controller.get({ search: searchOptions });
    console.log(resultado);
  } else {
    const allPelis = await controller.get({});
    console.log(allPelis);
  }
}
main();
