import * as minimist from "minimist";
import { PelisController } from "./controllers";
function parseaParams(argv) {
  const resultado = minimist(argv);

  return {
    options: resultado._,
    id: resultado.id,
    title: resultado.title,
    tags: resultado.tags,
  };
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log("parametros de la terminal====", params);
  const controllerss = new PelisController();

  if (params.options[0] === "get" || params.options[0] === "search") {
    controllerss.get(params).then((res) => console.log(res));
  } else if (params.options[0] === "add") {
    controllerss.add(params).then((res) => console.log(res));
  } else if (params.options[0] === undefined) {
    controllerss.get(params).then((res) => console.log(res));
  }
}

main();
