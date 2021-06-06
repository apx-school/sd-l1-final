import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  let arg = minimist(argv);
  return arg;
}

function requestHandler(parametros) {
  let response;
  const controller = new PelisController();
  if (parametros._[0] == "add") {
    let peli = {
      id: parametros.id,
      title: parametros.title,
      tags: parametros.tags,
    };
    response = controller.add(peli).then((res) => {
      return res;
    });
  }
  if (parametros._[0] == "get") {
    response = controller.get({ id: parametros._[1] }).then((res) => {
      return res;
    });
  }
  if (parametros._[0] == "search") {
    let options = {};
    if (parametros.title) {
      options["title"] = parametros.title;
    }
    if (parametros.tag) {
      options["tag"] = parametros.tag;
    }
    response = controller.get({ search: options }).then((res) => {
      return res;
    });
  }
  if (parametros._.length == 0) {
    response = controller.get({}).then((res) => {
      return res;
    });
  }

  return response;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const starter = requestHandler(params);
  starter.then((res) => console.log(res));
}

main();
