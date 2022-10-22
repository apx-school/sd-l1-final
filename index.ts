import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  let resultado = minimist(argv);

  if (resultado._[0] == "get") resultado = { id: resultado._[1] };
  else if (resultado._[0] == "search") {
    if (resultado.hasOwnProperty("title") && resultado.hasOwnProperty("tag")) {
      console.log("AMBOS");
      resultado = { search: { title: resultado.title, tag: resultado.tag } };
    } else if (resultado.hasOwnProperty("tag")) {
      console.log("TAG");
      resultado = { search: { tag: resultado.tag } };
    } else if (resultado.hasOwnProperty("title")) {
      console.log("TITLE");
      resultado = { search: { title: resultado.title } };
    } else {
      console.log("ELSE");
      resultado = "";
    }
  } else if (resultado._[0] == "add")
    resultado = {
      title: resultado.title,
      id: resultado.id,
      tags: resultado.tags,
    };
  else {
    resultado = "";
  }
  return resultado;
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  let busqueda =
    params.hasOwnProperty("title") &&
    params.hasOwnProperty("id") &&
    params.hasOwnProperty("tags")
      ? controller.add(params)
      : controller.get(params);
  busqueda.then((x) => console.log(x));
}

main();
