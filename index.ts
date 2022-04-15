import * as minimist from "minimist";
import { PelisCollection } from "./models";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function processOptions(argv) {
  const controller = new PelisController();
  const inputParseado = argv;
  if (inputParseado._[0] == "get") {
    return controller.get({ id: inputParseado._[1] }).then((r) => {
      return r;
    });
  }
  if (inputParseado._[0] == "search") {
    var obj = {};
    if (inputParseado.title && inputParseado.tag) {
      obj = {
        title: inputParseado.title,
        tag: inputParseado.tag,
      };
    } else if (inputParseado.title) {
      obj = {
        title: inputParseado.title,
      };
    } else if (inputParseado.tag) {
      obj = {
        tag: inputParseado.tag,
      };
    }
    return controller.get({ search: obj }).then((r) => {
      return r;
    });
  }
  if (
    inputParseado._[0] == "add" &&
    inputParseado.id &&
    inputParseado.title &&
    inputParseado.tags
  ) {
    const obj = {
      id: inputParseado.id,
      title: inputParseado.title,
      tags: inputParseado.tags,
    };
    return controller.add(obj).then((r) => {
      return r;
    });
  } else {
    return controller.pelis.getAll().then((r) => {
      return r;
    });
  }
}

function main() {
  const controller = new PelisController();
  controller.promise.then(() => {
    const params = parseaParams(process.argv.slice(2));
    const result = processOptions(params);
    result.then((r) => {
      console.log(r);
    });
  });
}

main();
