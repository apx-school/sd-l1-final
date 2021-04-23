import { PelisController } from "./controllers";
import * as minimist from "minimist";
import * as vacio from "lodash/isEmpty";

function parseaParams(argv) {
  const resultado = minimist(argv);

  if (vacio(resultado._)) {
    let options = {
      action: "esta vacio",
    };
    return options;
  }
  if (resultado._.includes("get")) {
    let options = {
      action: "get",
      id: resultado._[1],
    };
    return options;
  }
  if (resultado._.includes("search") && resultado.title) {
    let options = {
      action: "search",
      params: "title",
      do: resultado.title,
    };
    return options;
  }
  if (resultado._includes("search") && resultado.tag) {
    let options = {
      action: "search",
      params: "tags",
      do: resultado.tag,
    };
    return options;
  }

  if (resultado._[0] == "add") {
    let options = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
    return options;
  }
}

function main() {
  const collection = new PelisController();
  collection.promesa.then(() => {
    const params = parseaParams(process.argv.slice(2));
    collection.get(params).then((res) => {
      console.log(res);
    });
  });
}
main();
