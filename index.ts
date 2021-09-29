import * as minimist from "minimist";
import { PelisController } from "./controllers";

function commands(params) {
  const controller = new PelisController();
  if (params.id && params.title && params.tags) {
    return controller.add(params).then(() => {
      console.log("Peli agregada");
    });
  } else if (params.search || params.id) {
    return controller.get(params).then((resultado) => {
      console.log(resultado);
    });
  } else {
    return controller.get({}).then((resultado) => {
      console.log(resultado);
    });
  }
}

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (resultado._[0] == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search") {
    if (resultado.title && resultado.tag) {
      return { search: { title: resultado.title, tag: resultado.tag } };
    } else if (resultado.title) {
      return { search: { title: resultado.title } };
    } else if (resultado.tag) {
      return { search: { tag: resultado.tag } };
    }
  } else {
    return {};
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = commands(params);
  console.log(resultado);
}

main();
