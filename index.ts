import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "get") {
    const objeto = {
      id: resultado._[1],
    };
    return objeto;
  } else if (resultado._[0] == "search") {
    const objeto = {
      search: {
        title: resultado.title,
        tag: resultado.tag,
      },
    };
    return objeto;
  } else if (resultado._[0] == "add") {
    const objeto = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
    return objeto;
  }
}

function main() {
  const controlador = new PelisController();
  controlador.dataPromesa.then(() => {
    const params = parseaParams(process.argv.slice(2));

    if (params == undefined) {
      const resultado = controlador.get(params);
      return resultado.then((res) => console.log(res));
    } else if (
      params.hasOwnProperty("id") &&
      params.hasOwnProperty("title") &&
      params.hasOwnProperty("tags")
    ) {
      const resultado = controlador.add(params);
      return resultado.then((res) => console.log(res));
    } else {
      const resultado = controlador.get(params);
      return resultado.then((res) => console.log(res));
    }
  });
}

main();
