import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: { title: resultado.title } };
  } else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tag: resultado.tag } };
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag)
    return {
      search: { title: resultado.title, tag: resultado.tag },
    };
  else if (resultado._[0] == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else {
    return 0;
  }
}

function input(params) {
  const peliController = new PelisController();

  if (params.id && params.title && params.tags) {
    return peliController.add(params).then((resolv) => {
      console.log(resolv);
    });
  } else if (params.search || params.id) {
    return peliController.get(params).then((resolv) => {
      console.log(resolv);
    });
  } else if (params == 0) {
    return peliController.get({}).then((resolv) => {
      console.log(resolv);
    });
  }
}

function main() {
  const parsedArguments = parseaParams(process.argv.slice(2));
  input(parsedArguments);
}

main();
