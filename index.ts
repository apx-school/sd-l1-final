import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "add") {
    return {
      add: { id: resultado.id, title: resultado.title, tags: resultado.tags },
    };
  } else if (resultado._[0] == "search") {
    if (resultado.title && resultado.tag) {
      return { search: { title: resultado.title, tag: resultado.tag } };
    } else if (resultado.title) {
      return { search: { title: resultado.title } };
    } else if (resultado.tag) {
      return { search: { tag: resultado.tag } };
    }
  }

  return resultado;
}

async function main(): Promise<void> {
  const params = parseaParams(process.argv.slice(2));
  const peliControlador = new PelisController();
  peliControlador.get(params).then((resultado) => console.log(resultado));
}

main();
