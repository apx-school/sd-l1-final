import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function options(params): any {
  if (params._ == "add") {
    const opt = {
      metodo: "add",
      parametros: {
        id: params.id,
        title: params.title,
        tags: params.tags,
      },
    };
    return opt;
  } else if (params._.includes("get")) {
    const opt = { metodo: "get", parametros: { id: params._[1] } };
    return opt;
  } else if (params._ == "search") {
    const opt = {
      metodo: "get",
      parametros: {
        search: {
          title: params.title,
          tag: params.tag,
        },
      },
    };
    return opt;
  } else {
    const opt = { metodo: "get", parametros: [{}] };
    return opt;
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const ejecutor = options(params);

  const misPelis = new PelisController();
  if (ejecutor.metodo == "get") {
    misPelis.get(ejecutor.parametros).then((p) => console.log(p));
  }
  if (ejecutor.metodo == "add") {
    const nuevaPeli = new Peli();
    nuevaPeli.id = ejecutor.parametros.id;
    nuevaPeli.title = ejecutor.parametros.title;
    nuevaPeli.tags = ejecutor.parametros.tags;
    return misPelis.add(nuevaPeli).then((p) => console.log(p));
  }
}

main();
