import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function paramsOptions(params) {
  const controller = new PelisController();
  var resultado;

  if (params._[0] == "get") {
    const id = params._[1];
    const parametro = {
      id: id,
    };

    return (resultado = controller.get(parametro).then((res) => {
      return res;
    }));
  }

  if (params._[0] == "search") {
    var opciones = {};
    const parametro = {
      search: opciones,
    };
    if (params.title && params.tag) {
      parametro.search = {
        title: params.title,
        tag: params.tag,
      };
    } else if (params.title) {
      parametro.search = {
        title: params.title,
      };
    } else if (params.tag) {
      parametro.search = {
        tag: params.tag,
      };
    }

    return (resultado = controller.get(parametro).then((res) => {
      return res;
    }));
  }

  if (params._[0] == "add") {
    const nuevaPeli: Peli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };

    return controller.add(nuevaPeli).then((res) => {
      return res;
    });
  }

  if (params._.length == 0) {
    return controller.get([]).then((res) => {
      return res;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultadoFinal = paramsOptions(params).then((res) => {
    return res;
  });

  return resultadoFinal.then((res) => {
    console.log(res);
  });
}

main();
