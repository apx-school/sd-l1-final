import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parserMinimist(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function parserTerminal(controller, params) {
  if (params._[0] == "add") {
    return controller
      .add({ id: params.id, title: params.title, tags: params.tags })
      .then((r) => {
        return r;
      });
  } else if (params._[0] == "get") {
    return controller.get({ id: params._[1] }).then((r) => {
      return r;
    });
  } else if (params._[0] == "search") {
    return controller.get({ search: params }).then((r) => {
      return r;
    });
  } else if ({}) {
    return controller.get({}).then((r) => {
      return r;
    });
  }
}

function main() {
  const params = parserMinimist(process.argv.slice(2));
  const controller = new PelisController();
  parserTerminal(controller, params).then((res) => console.log(res));
}

main();
