import { PelisController } from "./controllers";
import * as _ from "lodash";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(parametros){
  const controller = new PelisController();

  if (parametros._[0] == "add"){
    return controller.add({
      title: parametros.title,
      tags: parametros.tags,
      id: parametros.id
    })
  }

  else if (parametros._[0] == "search"){
    return controller.get({search: {tag: parametros.tag, title: parametros.title}}).then((res)=> res)
  }
  else if (parametros._[0] == "get"){
    return controller.get({id: parametros._[1]})
  }
  else if(_.isEmpty(parametros._[0])){
    return controller.get({empty: "empty"})
  }


}

function main() {
  const parametros = parseaParams(process.argv.slice(2));
  return processOptions(parametros).then((res) => console.log(res))
}

main();
