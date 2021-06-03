import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function controllerOptions(obj) {
  const peliController = new PelisController();
  if (obj._[0] == "get") {
    return peliController.get({ id: obj._[1] }).then((obj) => obj);
  }
  if (obj._[0] == "search") {
    const objeto = {
      search: {
        title: obj.title,
        tags: obj.tag,
      },
    };
    return peliController.get(objeto).then((obj) => obj);
  }
  if (obj._[0] == "add") {
    const objeto = {
      id: obj.id,
      title: obj.title,
      tags: obj.tag,
    };
    return peliController.add(objeto).then((obj) => obj);
  }
  return peliController.get(null).then((obj) => obj);
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  controllerOptions(params).then((obj) => {
    console.log(obj);
  });
}

main();
