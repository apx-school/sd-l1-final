import minimist from "minimist";
import { PelisController,Peli } from "./controllers";

function parseaParams(argv: string[]) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params._[0] === "add") {
    // Para agregar peli: npx tsx ./src/index.ts add --id=1 --title="Peli" --tags=accion --tags=drama
    const peli: Peli = {
      id: Number(params.id),
      title: params.title,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags],
    };
    const resultado = await controller.add(peli);
    console.log("Película agregada:", resultado);
  } else if (params._[0] === "get") {
    // Para buscar por id: npx tsx ./src/index.ts get 1
    const id = Number(params._[1]);
    const resultado = await controller.get({ id });
    console.log("Resultado get:", resultado);
  } else if (params._[0] === "search") {
    // Para buscar por título o tag: npx tsx ./src/index.ts search --title="algo" --tag="accion"
    const searchOptions = {
      title: params.title,
      tag: params.tag,
    };
    const resultado = await controller.get({ search: searchOptions });
    console.log("Resultado search:", resultado);
  } else {
    // Si no hay comando, muestra todas las pelis
    const resultado = await controller.get();
    console.log("Todas las películas:", resultado);
  }
}

main();

