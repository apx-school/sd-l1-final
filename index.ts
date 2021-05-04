import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv): any {
  const operacion = argv.slice(0, 1);
  const resultado = minimist(argv);

  if (operacion == "get") {
    if (resultado.id) {
      return resultado;
    } else {
      return { id: resultado._[1] };
    }
  }

  if (operacion == "search") {
    if (resultado.title && resultado.tag) {
      return { title: resultado.title, tag: resultado.tag };
    }
    if (resultado.title) {
      return { title: resultado.title };
    }
    if (resultado.tag) {
      return { tag: resultado.tag };
    }
  }

  if (operacion == "add") {
    return { id: resultado.id, title: resultado.title, tags: resultado.tags };
  }
}

function operar(): Promise<any> {
  const control = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  const operacion = process.argv.slice(2).slice(0, 1)[0];

  if (operacion == "get" || operacion == "search") {
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
