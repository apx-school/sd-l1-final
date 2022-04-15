import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function options(params): any {
  const misPelis = new PelisController();

  if (params._ == "add") {
    const opt = {
      parametros: {
        id: params.id,
        title: params.title,
        tags: params.tags,
      },
    };
    return misPelis.add(opt.parametros).then((p) => p);
  } else if (params._.includes("get")) {
    const opt = { parametros: { id: params._[1] } };
    return misPelis.get(opt.parametros).then((p) => p);
  } else if (params._ == "search") {
    const opt = {
      parametros: {
        search: {
          title: params.title,
          tag: params.tag,
        },
      },
    };
    return misPelis.get(opt.parametros).then((p) => p);
  } else {
    const opt = { metodo: "get", parametros: [{}] };
    return misPelis.get(opt.parametros).then((p) => p);
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const ejecutor = options(params);
  ejecutor.then((p) => console.log(p));
}

main();
