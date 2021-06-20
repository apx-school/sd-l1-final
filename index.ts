import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function ejecutaArgumentos (params) {
  const pelisController = new PelisController;
  
  if(params._[0] == 'get') {
      pelisController.get({id: params._[1]}).then((res) => {
        console.log(res);
      });
  }

  if (params._[0] == 'search') {
    pelisController.get({search: {title: params.title, tag: params.tag},
    }).then((res)=> { 
      console.log(res);
    });
  }

  if (params._[0] == 'add') {
    console.log ("Se agregará la siguiente película:", params.title);
    pelisController.add(params); 
    } else return pelisController.get(params).then(()=>{
    });
}

function main() {
  const parametros = parseaParams(process.argv.slice(2));
  ejecutaArgumentos(parametros);
  console.log ("los parametros llegan asi:", parametros);
}

main();
