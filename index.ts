import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}


function ejecutador (params) {
  const pelisController = new PelisController();

  if (params._[0] == 'search') {
      pelisController.get({search: {title: params.title, tag: params.tag}}).then((res) => {
        console.log(res);
    });

  } else if(params._[0] == "get") {
      pelisController.get({id: params._[1]}).then((res) => {
      console.log(res);
    });

  } else if (params._[0] == "add") {
      console.log ("Se agregará la siguiente película:", params.title);
      delete params["_"];
      pelisController.add(params); 
    
  } else {
      pelisController.coleccion.getAll().then((res) => {
      console.log(res);
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutador(params);
}

main();
