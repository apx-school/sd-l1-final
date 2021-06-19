import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function ejecutador (params) {
  const pelisController = new PelisController;

  if (params._ == "get") {
    pelisController.get({id: params._[1]}).then((res) => {
      console.log(res)
    });
    
    if (params._ == 'search') {
      pelisController.get({ search: {title: params.title, tag: params.tag},
    }).then((res)=> { 
      console.log(res);
    });
  } 
  else if ( params._ == "add") {
    console.log ("Se agregará la siguiente película:", params.title);
    pelisController.add(params); 
    } else return pelisController.get(params).then((p)=>{
      console.log(p);
    })
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log ("los parametros llegan asi:", params);
  ejecutador(params);
}

main();

