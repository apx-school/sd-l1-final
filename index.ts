import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
  };

function finalOption (parametros) {
const controller = new PelisController;

  if (parametros._[0] == "add"){
    return controller.add({id: parametros.id, title: parametros.title, tags: parametros.tags}).then(resultado => console.log(resultado));
  }
  else if (parametros._[0] == "get") {
    return controller.get({id: parametros._[1]}).then(resultado => console.log (resultado));
  }
  else if (parametros._[0] == "search" && parametros.title) {
    return controller.get({obj: {title: parametros.title}}).then(resultado => console.log(resultado));
  }
  else if (parametros._[0] == "search" && parametros.tags) {
    return controller.get({obj: {tags: parametros.tags}}).then(resultado => console.log (resultado));
  }
  else if (parametros._[0] == "search" && parametros.tags && parametros.title) {
    return controller.get ({obj: {title: parametros.title, tags: parametros.tags}}).then(resultado => console.log (resultado));
  }
  else if (!parametros) {
    return controller.get({});
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  return finalOption(params).then(resultadoFinal => console.log("Resultado final: ", resultadoFinal));
}

main();
