import { PelisCollection, Peli } from "./models";
import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  } else if (resultado._[0] == "get") {
    return {
      id: resultado._[1],
    };
  } else if (resultado._[0] == "search") {
    if (resultado.title && resultado.tag) {
      return {
        title: resultado.title,
        tag: resultado.tag,
      };
    } else if (resultado.title) {
      return {
        title: resultado.title,
      };
    } else if (resultado.tag) {
      return {
        tag: resultado.tag,
      };
    }
  } else {
    return {};
  }
}

function main() {
  const controller = new PelisController();
  // controller.promise.then(() => {
  const params = parseaParams(process.argv.slice(2));
  if (params.id && params.title) {
    const result = controller.add(params).then((r) => console.log(r));
  } else {
    const result = controller.get(params);
    console.log(result);
  }
  //});
}

main();
