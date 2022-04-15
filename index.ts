import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams() {
  const resultado = minimist(process.argv.slice(2));
  return resultado;
}

function arista(params) {
  const pelisController = new PelisController();

  if (params._[0] == "get") {
    return pelisController.get({ id: params._[1]}).then((x) => {
      return x;
    });
  } else if (params._ == "search") {
    return pelisController
      .get({
        search: {
          title: params.title,
          tag: params.tag
        },
      })
      .then((x) => {
        return x;
      });
  } else if (params._ == "add") {
    console.log(`La pelicula ${params.title} se ha agregado a la lista`);
    delete params._
    return pelisController.add(params);
  } else {
    return pelisController.get(params).then((x) => {
      return x;
    });
  }
}

function main() {
  const params = parseaParams();
  console.log(params);
  arista(params).then((x) => {
    console.log(x);
  });
}

main();
