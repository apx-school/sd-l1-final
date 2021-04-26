import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(argv) {
  const controller = new PelisController();
  // al controller llega este metodo bien
  if (argv._[0] == "get") {
    const id = argv._[1];
    return controller.get({ id: id }).then((pel) => {
      return pel;
    });
    // los serach tb llegan bien
    //el problema es cuando se le pasa el tag y el title juntos
  } else if (argv._[0] == "search") {
    var params = {};

    if (argv.title && argv.tag) {
      params = {
        title: argv.title,
        tags: argv.tag,
      };
    }
    if (argv.title) {
      params = {
        title: argv.title,
      };
    }
    if (argv.tag) {
      params = {
        tags: argv.tag,
      };
    }
    return controller.get({ search: params }).then((pel) => {
      return pel;
    });
  } else if (argv._[0] == "add") {
    var nuevaPeli = {
      id: argv.id,
      title: argv.title,
      tags: argv.tag,
    };
    return controller.add(nuevaPeli).then((pel) => {
      return pel;
    });
    // aqui me entrega un array vacio
  } else if (argv._.length == 0) {
    return controller.get({}).then((pel) => {
      return pel;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultad = processOptions(params);
  resultad.then((r) => console.log(r));
}

main();
