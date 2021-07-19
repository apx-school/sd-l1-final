import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli, PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}
function ejecutor(params) {
  const controller = new PelisController();

  if (params._.includes("add")) {
    return controller.add({
      id: params.id,
      title: params.title,
      tags: params.tags,
    });
  } else if (params._.includes("get")) {
    return controller.get({ id: params._[1] });
  } else if (params._.includes("search")) {
    // return controller.get({ search: { params } });
    if (params.title && params.tag) {
      return controller.get({
        search: { title: params.title, tags: params.tag },
      });
    } else if (params.title) {
      return controller.get({ search: { title: params.title } });
    } else {
      return controller.get({ search: { tags: params.tag } });
    }
  } else {
    return controller.get({});
  }
}
function main() {
  const params = parseaParams(process.argv.slice(2));
  const final = ejecutor(params);
  final.then((final) => {
    console.log(final);
  });
  // console.log(final);
}

main();
