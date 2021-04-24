import { PelisController } from "./controllers";
import * as minimist from "minimist";
import * as vacio from "lodash/isEmpty";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //el "_" de resultado representa el array que genera minimist dentro del objeto respuesta

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
  if (resultado._.includes("search") && resultado.tag) {
    let options = {
      action: "search",
      params: "tags",
      do: resultado.tag,
    };
    return options;
  }

  if (resultado._[0] == "add") {
    let options = {
      action: "add",
      peli: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };
    return options;
  }
}

function main() {
  const collection = new PelisController();
  collection.promesa.then(() => {
    const res = parseaParams(process.argv.slice(2));
    if (res.action !== "add") {
      collection.get(res).then((r) => {
        console.log(r);
      });
    } else {
      collection.add(res).then((r) => {
        console.log(r);
      });
    }
  });
}
main();
