import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._[0] == "search" && resultado.title && resultado.tags) {
    return { search: { title: resultado.title, tags: resultado.tags } };
  } else if (resultado._[0] == "search" && resultado.title) {
    return {
      search: { title: resultado.title },
    };
  } else if (resultado._[0] == "search" && resultado.tags) {
    return { search: { tags: resultado.tags } };
  } else if (resultado._[0] == "get") {
    return { id: resultado._[1] };
  } else {
    return {};
  }
}

function commands(params) {
  const controller = new PelisController();
  if (params.id && params.title && params.tags) {
    return controller.add(params).then((res) => {
      console.table(res);
    });
  } else if (params.search || params.id) {
    return controller.get(params).then((res) => {
      console.table(res);
    });
  } else {
    return controller.get({}).then((res) => {
      console.table(res);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  commands(params);
}

main();
