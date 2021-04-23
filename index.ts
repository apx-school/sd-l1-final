import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(argv) {
  //console.log(argv);
  const controller = new PelisController();
  // este metodo esta bien . el resto conrolar en el  model. metodo  del serch
  if (argv._[0] == "get") {
    const id = argv._[1];
    return controller.get({ id: id }).then((pel) => {
      return pel;
    });
  } else if (argv._[0] == "search") {
    var params = {};

    if (argv.title && argv.tags) {
      params = {
        title: argv.title,
        tags: argv.tags,
      };
    }
    if (argv.title) {
      params = {
        title: argv.title,
      };
    }
    if (argv.tags) {
      params = {
        tags: argv.tags,
      };
    }
    return controller.get({ search: params }).then((pel) => {
      return pel;
    });
  } else if (argv._[0] == "add") {
    var nuevaPeli = {
      id: argv.id,
      title: argv.title,
      tags: argv.tags,
    };
    return controller.add(nuevaPeli).then((pel) => {
      return pel;
    });
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
// no tocar en index pasa bien los parametros desde la terminal
main();
