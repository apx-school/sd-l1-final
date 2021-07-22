import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado[0] == "get") {
    return { id: resultado._[0] };
  } else if (resultado[0] == "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else if (resultado[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado[0] == "search" && resultado.tag) {
    return { search: { title: resultado.tag } };
  } else if (resultado[0] == "add") {
    return { title: resultado.title, id: resultado.id, tags: resultado.tag };
  } else {
    return 0;
  }
}

function ejcutarComandos(params) {
  const pelisController = new PelisController();
  if (params.add) {
    return pelisController.add(params).then((resultado) => {
      console.log(resultado);
    });
  } else if (params.title && params.id && params.tags) {
    return pelisController.add(params).then((resultado) => {
      console.log(resultado);
    });
  } else if (params.search || params.id) {
    return pelisController.get(params).then((resultado) => {
      console.log(resultado);
    });
  } else if (params == 0) {
    return pelisController.get({}).then((resultado) => {
      console.log(resultado);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const optionPelis = ejcutarComandos(params);
  optionPelis.then((resultado) => {
    console.log(resultado);
  });
}

main();
