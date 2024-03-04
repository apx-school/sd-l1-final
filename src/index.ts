import minimist from "minimist";
import { PelisController } from "/home/agustin/Documentos/APX/sd-l1-final/src/controllers";

//import "./pelis.json";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return {
    _: resultado._,
    id: resultado.id,
    title: resultado.title,
    tags: resultado.tag,
  };
}

function main() {
  const controlador = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  if (params._ == "add") {
    const obj = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    console.log(obj);
    const resultado = controlador.add(obj);
  } else if (params._ == "search") {
    const obj = {};
    if (params.title && params.tags == undefined) {
      const obj = {
        search: {
          title: params.title,
        },
      };
      const resultado = controlador.get(obj).then((res) => {
        console.log(res);
      });
    } else if (params.tags && params.title == undefined) {
      const obj = {
        search: {
          tag: params.tags,
        },
      };
      const resultado = controlador.get(obj).then((res) => {
        console.log(res);
      });
    } else if (params.title && params.tags) {
      const obj = {
        search: {
          title: params.title,
          tag: params.tags,
        },
      };
      const resultado = controlador.get(obj).then((res) => {
        console.log(res);
      });
    } else {
      const obj = {
        search: {
          title: params.title,
          tag: params.tags,
        },
      };
    }
  } else if (params._[0] === "get") {
    const obj = {
      id: params._[1],
    };
    const resultado = controlador.get(obj).then((res) => {
      console.log(res);
    });
  } else {
    controlador.get({}).then((res) => {
      console.log(res);
    });
  }
}

main();
