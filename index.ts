import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //return resultado;

  if (resultado._[0] == "add") {
    return { id: resultado.id, title: resultado.title, tags: resultado.tags };
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
    return { search: { title: resultado.title, tag: resultado.tag } };
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else {
    return {};
  }
}

function ejecutar(params) {
  const objetoControlls = new PelisController();
  if (params.id && params.title && params.tags) {
    return objetoControlls.add(params).then((resultado) => {
      console.log(resultado);
    });
  } else if (params.id || params.search) {
    return objetoControlls.get(params).then((resultado) => {
      console.log(resultado);
    });
  } else {
    return objetoControlls.get({}).then((resultado) => {
      console.log(resultado);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutar(params);
  //console.log(params);
}

main();
