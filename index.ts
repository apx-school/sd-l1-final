import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  let arg = minimist(argv);
  return {
    action: arg._[0],
    id: arg.id,
    search: { title: arg.title, tags: arg.tags },
  };
}

function requestHandler(parametros) {
  const controller = new PelisController();
  if (parametros.action == "search") {
    return controller.get(parametros);
  }
  if (parametros.action == "add") {
    const peli = {
      id: parametros.id,
      title: parametros.search.title,
      tags: parametros.search.tags,
    };
    return controller.add(peli);
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const starter = requestHandler(params);
  starter.then((res) => console.log(res));
}

main();
