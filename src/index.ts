// Importar minimist
//
import minimist from "minimist";

const minimistTyped = minimist as (argv: string[]) => {
  _: string[];
  [key: string]: any;
};

// Importar el controller
import { PelisController } from "./controllers";

// Función para parsear los parámetros
function parseaParams(argv: string[]) {
  const resultado = minimistTyped(argv);
  return resultado;
}

// Declarar el objeto process
declare const process: { argv: string[] };

// Función principal
async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params._[0] === "add") {
    const peli = {
      id: params.id,
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };
    const resultado = await controller.add(peli);
    console.log(resultado ? "Peli agregada" : "No se pudo agregar");
  } else if (params._[0] === "get") {
    const id = params._[1];
    const peli = await controller.getOne({ id: Number(id) });
    console.log(peli);
  } else if (params._[0] === "search") {
    const options: { search: { title?: string; tag?: string } } = {
      search: {},
    };
    if (params.title) options.search.title = params.title;
    if (params.tag) options.search.tag = params.tag;
    const pelis = await controller.get(options);
    console.log(pelis);
  } else {
    const pelis = await controller.get();
    console.log(pelis);
  }
}

main();
