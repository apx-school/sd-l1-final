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
    return controller.get({ id: id }).then((pel) => {
      return pel;
    });
  } else if (argv._[0] == "search") {
    let params = {
      title: argv.title,
      tag: argv.tag,
    };

    return controller.get({ search: params }).then((pel) => {
      return pel;
    });
  } else if (argv._[0] == "add") {
    let nuevaPeli = {
      id: argv.id,
      title: argv.title,
      tags: argv.tag,
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

main();
