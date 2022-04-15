import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(argv) {
  const controller = new PelisController();

  if (argv._[0] == "get") {
    const id = argv._[1];
    return controller.get({ id: id }).then((res) => {
      return res;
    });
  } else if (argv._[0] == "search") {
    let parametros = {};
    if (argv.title) {
      parametros = {
        title: argv.title,
      };
    }
    if (argv.tag) {
      parametros = {
        tag: argv.tag,
      };
    }

    return controller.get({ search: parametros }).then((res) => {
      return res;
    });
  } else if (argv._[0] == "add") {
    let nuevaPeli = {
      id: argv.id,
      title: argv.title,
      tags: argv.tags,
    };
   

    return controller.add(nuevaPeli).then((res) => {
      return res;
    });
  } else if (argv._.length == 0) {
    return controller.get([]).then((res) => {
      return res;
    });
  }
}

function main() {
  const parametros = parseaParams(process.argv.slice(2));
  const resultadoFinal = processOptions(parametros);
  resultadoFinal.then((r) => console.log(r));
}

main();