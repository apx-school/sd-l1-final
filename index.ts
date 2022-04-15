import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const operacion = argv.slice(0, 1);
  const resultado = minimist(argv);

  if (operacion == "get") {
    if (resultado.id) {
      return { get: resultado };
    } else {
      return { get: { id: resultado._[1] } };
    }
  }
  if (operacion == "search") {
    if (resultado.title && resultado.tag) {
      return { search: { title: resultado.title, tag: resultado.tag } };
    }
    if (resultado.title) {
      return { search: { title: resultado.title } };
    }
    if (resultado.tag) {
      return { search: { tag: resultado.tag } };
    }
  }

  if (operacion == "add") {
    return {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
  }
}

function operar() {
  const control = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  const operacion = process.argv.slice(2).slice(0, 1)[0];

  if (operacion == "get") {
    return control.get(params.get);
  } else if (operacion == "search") {
    return control.get(params);
  } else if (operacion == "add") {
    return control.add(params);
  } else {
    return control.pelisColl.getAll();
  }
}

function main() {
  operar().then((res) => console.log(res));
}

main();
