import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado._.includes("get")) {
    return JSON.parse(resultado._[1])
  } else if (resultado._.includes("add")) {
    return {
      add: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };
  } else if (
    resultado._.includes("search") && resultado.title && resultado.tag) {
    return {
      search: {
        title: resultado.title,
        tag: resultado.tag,
      },
    };
  } else if (resultado._.includes("search") && resultado.title) {
    return {
      search: {
        title: resultado.title,
      },
    };
  } else if (resultado._.includes("search") && resultado.tag) {
    return {
      search: {
        tag: resultado.tag,
      },
    };
  };
}

async function main() {
  const peliControl = new PelisController();
  let params;
  const comandos = process.argv.slice(2);
  if (comandos.length === 0){
    return peliControl.get({null: null}).then((resp) => console.log(resp));
  } else {
    params = parseaParams(comandos); 
  };
  if (params.hasOwnProperty("id") || params.hasOwnProperty("search")) {
    peliControl.get(params).then((resp) => console.log(resp));
  } else if (params.hasOwnProperty("add")) {
    peliControl.add(params.add).then((resp) => console.log(resp));
  };
}

main();
