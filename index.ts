import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
  
}

function processOptions(options) {
  const pelisController = new PelisController();
  if (options._[0] == "search") {
    if (options.search.tag) {
      return pelisController.get({ search: options.search.tag });
    }
    else if (options.search.title) {
      return pelisController.get({ search: options.search.title });
    }
  }
  else if (options._[0] == "get") {
    return pelisController.get({ id: options.id })
  }
    
  else if (options._[0] == "add") {
    return pelisController.add({
      id: options.id,
      title: options.title,
      tags: options.tag
    });
  }
  else {
    return pelisController.get()
  }
  
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = processOptions(params);
  console.log(resultado);
 
}

main();
