import * as minimist from "minimist";
import { resourceUsage } from "node:process";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    const peli = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
    const controlador = new PelisController();
    controlador.add(peli);
  }

  let argId;

  if (resultado._[0] == "get") {
    argId = resultado._[1];
  }

  return {
    id: argId,
    search: {
      title: resultado.title,
      tag: resultado.tag,
    },
  };
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const controlador = new PelisController();
  const resultado = controlador.get(params);
  resultado.then((respuesta) => {
    console.log(respuesta);
  });
}

main();
