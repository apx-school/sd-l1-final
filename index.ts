import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}
/*
async function pelisController(argumentos){
  const controller = new PelisController();

  if (argumentos._[0] == "add"){
    return await controller.add({
      id: argumentos.id,
      title: argumentos.title,
      tags: argumentos.tags
    })
    .then((r) => {
      return r
    })
  }
  if (argumentos._[0] == "get"){
    return await controller.get({
      id: argumentos._[1]
    })
  }
  if (argumentos._[0] == "search"){
    return await controller.get({
      search: {
        title: argumentos.title,
        tags: argumentos.tag
      }
    })
  }
  if (_.isEmpty(argumentos._[0])){
    return await controller.get({empty: "empty"})
  }
}


async function main() {
  const peliController = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  /*const resultadoFinal = parseaParamsTerminal(peliController, params);
  resultadoFinal.then((respuesta) => {
    console.log(respuesta)
  })
}

main(); */