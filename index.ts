import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  if (params._[0] === "get") {
    let consoleId = params._[1];
    return controller.get({ id: consoleId })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  
  else if (params._[0] === "search") {
    delete params._
    return controller.pelis.search(params)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  } else if (params._[0] === "add") {
    delete params._
    return controller.pelis.add(params)
    .then((res) => console.log(res))
  } else {
    return controller.get(null)
    .then(res => console.log(res))
    .catch(err => console.log(err)) 
  }

}

main();
