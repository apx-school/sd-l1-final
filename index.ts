import * as minimist from "minimist";
import {PelisController} from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
  };

function finalOption (parametros): Promise<any> {
const controller = new PelisController;

  if (parametros._[0] == "add"){
    return controller.add({id: parametros.id, title: parametros.title, tags: parametros.tags}).then(resultado => {
      return resultado;
    });
  }
  else if (parametros._[0] == "get") {
    return controller.get({id: parametros._[1]}).then(resultado => {
      return resultado;
    });
  }
  else if (parametros._[0] == "search" && parametros.title) {
    return controller.get({search: {title: parametros.title}}).then(resultado =>{
      return resultado;
    });
  }
  else if (parametros._[0] == "search" && parametros.tag) {
    return controller.get({search: {tag: parametros.tag}}).then(resultado => {
      return resultado;
    });
  }
  else if (parametros._[0] == "search" && parametros.tags && parametros.title) {
    return controller.get ({search: {title: parametros.title, tags: parametros.tags}}).then(resultado => {
      return resultado;
    });
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


