import * as minimist from "minimist";
import {PelisController} from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);
  if(resultado[0] == "get"){    
    return {id: resultado._[1]};
  } else if(resultado[0] == "search" && resultado.title && resultado.tag){
    return { search: {title: resultado.title, tag: resultado.tag}};
  } else if(resultado[0]== "search" && resultado.title){
    return { search: {title: resultado.title}};
  } else if(resultado[0] == "search" && resultado.tag){
    return {searc: {tag: resultado.tag}};
  } else if( resultado[0] == "add"){
    return {title: resultado.title, id:resultado.id, tags: resultado.tags}; 
  } else {
    return 0;
  }
}

function ejecutarComandos(params){
const controllerPelis = new PelisController;
var resultado;
if(params.add){
  return resultado = controllerPelis.add(params);
}else if(params.title && params.id && params.tags){
  return resultado = controllerPelis.add(params);
}else if(params.search || params.id){
  return resultado = controllerPelis.get(params);
}else if(params == 0){
  return resultado = controllerPelis.get({});
}
return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComandos(params);
}

main();
