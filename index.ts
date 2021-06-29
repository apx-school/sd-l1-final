import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const parseo = minimist(argv);
  if (parseo._[0] == "get") {
    return { id: parseo._[1] };
  } else if (parseo._[0] == "search" && parseo.title && parseo.tag) {
    return { search: { title: parseo.title, tag: parseo.tag } };
  } else if (parseo._[0] == "search" && parseo.title) {
    return { search: { title: parseo.title } };
  } else if (parseo._[0] == "search" && parseo.tag) {
    return { search: { tag: parseo.tag } };
  } else if (parseo._[0] == "add") {
    return { title: parseo.title, id: parseo.id, tags: parseo.tags };
  }
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  const resultado = controller.get(params);
  resultado.then((resultado) => console.log(resultado));
}

main();
