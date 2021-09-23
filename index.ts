import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function paramsAdd(res) {
  let resultado: Peli;
  if (res._.includes("add")) {
    resultado = {
      id: res.id,
      title: res.title,
      tags: res.tags,
    };
    return resultado;
  }
}

function paramsGet(res) {
  if (res._.includes("get")) {
    return { id: res.id };
  } else if (res._.includes("search")) {
    return { search: { title: res.title, tag: res.tag } };
  } else {
    return {};
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  if (params._[0] == "add") {
    const funcionAdd = paramsAdd(params);
    controller.add(funcionAdd).then(() => {
      console.log("Pelicula agregada");
    });
  } else {
    const funcionGet = paramsGet(params);
    controller.get(funcionGet).then((res) => {
      console.log(res);
    });
  }
}

main();
