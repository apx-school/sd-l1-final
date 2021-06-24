import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "add") {
    return {
      add: { id: resultado.id, title: resultado.title, tags: resultado.tags },
    };
  } else if (resultado._[0] == "search" && resultado.tag && resultado.title) {
    return { search: { tags: resultado.tag, title: resultado.title } };
  } else if (resultado._[0] == "get") return { id: resultado._[1] };
  else if (resultado._[0] == "search" && resultado.title)
    return { search: { title: resultado.title } };
  else if (resultado._[0] == "search" && resultado.tag) {
    return { search: { tags: resultado.tag } };
  } else return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const Controller = new PelisController();
  Controller.get(params).then((res) => {
    console.table(res);
  });
}

main();
