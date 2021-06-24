import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams() {
  const resultado = minimist(process.argv.slice(2));
  //Como parametro podria ir otro nombre (ej: dataEntrada)
  return resultado;
}

function arista(params) {
  const pelisController = new PelisController();

  if (params._ == "search") {
    pelisController.get({
        search: {
          title: params.title,
          tag: params.tag,
        },
      }).then((x) => {
        return x;
      });
  } else if (params._ == "add") {
    console.log(`La pelicula ${params.title} se ha agregado a la lista`);
    delete params._;
    pelisController.add(params);
  } else {
    return pelisController.get(params).then((x) => {
      return x;
    });
  }
}

function main() {
  const params = parseaParams();
  console.log(params);
  arista(params);
}

main();
