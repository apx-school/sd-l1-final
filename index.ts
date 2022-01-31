import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}
function processOptions(optionP) {
  const pelisController = new PelisController();
  if (optionP._[0] == "add") {
    return pelisController
      .add({
        id: optionP.id,
        title: optionP.title,
        tags: optionP.tags,
      })
      .then((resouest) => {
        return resouest;
      });
  }
  if (optionP._[0] == "get") {
    return pelisController.get({ id: optionP._[1] });
  }
  if (optionP._[0] == "search") {
    return pelisController.get({
      search: { title: optionP.title, tag: optionP.tag },
    });
  }
  if (optionP._[0] == undefined) {
    return pelisController.get({ empty: "Axeloide" });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  return processOptions(params).then((respuesta) => {
    console.log(respuesta);
  });
}

main();
