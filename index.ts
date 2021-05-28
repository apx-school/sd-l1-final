import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function getOption(controller, params) {
  var response;

  if (params._[0] == ["add"]) {
    const objeto = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    response = controller.add(objeto).then((i) => {
      return i;
    });
  }

  if (params._[0] == ["get"]) {
    const obj = { id: params._[1] };
    response = controller.get(obj).then((i) => {
      return i;
    });
  }

  if (params._[0] == "search") {
    let objeto = {};
    if (params.title) {
      objeto["title"] = params.title.toLowerCase();
    }
    if (params.tag) {
      objeto["tag"] = params.tag;
    }
    response = controller.get({ search: objeto }).then((result) => {
      console.log({ search: objeto });
      return result;
    });
  }

  if (params._.length == 0) {
    response = controller.get({}).then((result) => {
      return result;
    });
  }
  return response;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  getOption(controller, params).then((r) => {
    console.log(r);
  });
}

main();
