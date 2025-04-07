import minimist from "minimist";
import { PelisController } from "./controllers";

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
    console.log(resultado ? "Película agregada" : "Error al agregar la película");
  } else if (params._[0] === "get") {
    const resultado = await controller.get({ id: Number(params._[1]) });
    console.log(resultado);
  } else if (params._[0] === "search") {
    const resultado = await controller.get({ search: { title: params.title, tag: params.tag } });
    console.log(resultado);
  } else {
    const resultado = await controller.get();
    console.log(resultado);
  }
}


main();
