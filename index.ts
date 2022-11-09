import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado.id) {
    return { id: resultado.id };
  } else if (resultado.search) {
    if (resultado.title) {
      return { search: { title: resultado.title } };
    } else if (resultado.tag) {
      return { search: { tag: resultado.tag } };
    }
    // else if (resultado.title && resultado.tag) {
    //   return { search: { title: resultado.title, tag: resultado.tag } };
    // }
  }
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();
  pelisController.get(params).then((res) => {
    console.log(res);
  });
}

main();
