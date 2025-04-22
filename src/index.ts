import minimist from "minimist";
import { title } from "process";
import { PelisController } from "./controllers";
import { Peli } from "./models";

type Opcion = {
  command: "add" | "get" | "search",
  id?: number,
  title?: string,
  tags?: string[],
  tag?: string;
}

function parseaParams(argv): Opcion {
  const resultado = minimist(argv);

  return {
    command: resultado._[0],
    id: resultado.id || Number(resultado._[1]),
    title: resultado.title,
    tags: resultado.tags,
    tag: resultado.tag
  }
}



async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  const comandoPrincipal = params.command;

  if (!comandoPrincipal) {
    const peliculas = await controller.get();
    console.log(peliculas);
    return;
  }

  switch (comandoPrincipal.toLocaleLowerCase().trim()) {
    case "add":
      const peliNueva: Peli = { id: params.id, title: params.title, tags: params.tags }
      await controller.add(peliNueva);
      break;
    case "get":
      const peliEncontrada = await controller.getOne({ id: params.id })
      console.log(peliEncontrada);
      break;
    case "search":
      let peliBuscada: any = {};
      if (params.title) {
        peliBuscada.title = params.title;
      }
      if (params.tags) {
        peliBuscada.tags = params.tags;
      }
      const resultado = await controller.get(peliBuscada);
      console.log(resultado);
      break;
    default:
      const pelis = await controller.get();
      console.log(pelis);
      break;
  }
}

main();
