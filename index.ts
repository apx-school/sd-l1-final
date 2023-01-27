import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  let toReturn;

  if (resultado._[0] == "get") {
    toReturn = { id: resultado._[1] };
  }
  if (resultado._[0] == "search") {
    toReturn = { search: { title: resultado.title, tag: resultado.tag } };
  }
  if (resultado._[0] == "add") {
    toReturn = {
      add: { id: resultado.id, title: resultado.title, tags: resultado.title },
    };
  }
  if (resultado._[0] == undefined) {
    toReturn = "get all";
  }
  //console.log(resultado);

  return toReturn;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  const controller = new PelisController();

  if (params.id || params.search) {
    controller.get(params).then((res) => {
      console.log(res);
    });
  }
  if (params.add) {
    controller.add(params.add).then((res) => {
      console.log(res);
    });
  }
  if (params == "get all") {
    controller.pelisCollection.getAll().then((res) => {
      console.log(res);
    });
  }
}

main();
