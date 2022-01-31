import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}
function processOptions(params) {
  const pelisController = new PelisController();

  if (params._[0] == "add") {
    // ADD
    return pelisController
      .add({
        id: params.id,
        title: params.title,
        tags: params.tags,
      })
      .then((r) => {
        return r;
      });
  }
  if (params._[0] == "get" && params._[1]) {
    // GET ID
    return pelisController.get({ id: params._[1] }).then((r) => {
      return r;
    });
  }
  if (params._[0] == "search") {
    // SEARCH
    return pelisController
      .get({
        search: {
          title: params.title,
          tag: params.tag,
        },
      })
      .then((r) => {
        return r;
      });
  }
  if ({}) {
    return pelisController.get({}).then((r) => {
      return r;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const finalResult = processOptions(params);
  finalResult.then((respuesta) => console.table(respuesta));
}

main();
