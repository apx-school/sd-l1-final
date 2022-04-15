import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(params) {
  const controller = new PelisController();

  if (params._[0] == "get") {
    let id = params._[1];
    return controller.get({ id: id });
  }
  else if (params._[0] == "add") {
    return controller.add({
      id: params.id,
      title: params.title,
      tags: params.tags
    });
  }
  else if (params._[0] == "search") {
    let result;
    if (params.title) result = { title: params.title };
    if (params.tag) result = {...result, tag: params.tag};
    return controller.get({ search: result });
  }
  else if (params._ == []) {
    return controller.get({});
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  processOptions(params).then(res => console.log(res));
}

main();
