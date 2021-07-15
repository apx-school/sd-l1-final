import * as minimist from "minimist";
import {PelisController} from "./controllers";
import { Peli } from "./models";


function parseaParams(argv) {
  const resultado = minimist(argv);
  if(resultado[0] == "get"){    
    return {id: resultado._[1]};
  } else if(resultado[0] == "search" && resultado.title && resultado.tag){
    return { search: {title: resultado.title, tag: resultado.tag}};
  } else if(resultado[0]== "search" && resultado.title){
    return { search: {title: resultado.title}};
  } else if(resultado[0] == "search" && resultado.tag){
    return {search: {tag: resultado.tag}};
  } else if( resultado[0] == "add"){
    return {title: resultado.title, id:resultado.id, tags: resultado.tags}; 
  } else {
    return 0;
  }
}


function ejecutarComandos(params){
const controllerPelis = new PelisController();
if(params.add){
  return controllerPelis.add(params).then((resultado) => {console.log(resultado)});
} else if(params.title && params.id && params.tags){
  return controllerPelis.add(params).then((resultado) => {console.log(resultado)});
} else if(params.search || params.id){
  return controllerPelis.get(params).then((resultado) => {console.log(resultado)});
} else if(params == 0){
  return controllerPelis.get({}).then((resultado) => {console.log(resultado)});
}
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const optionPelis = ejecutarComandos(params);
  optionPelis.then((resultado) =>{
   console.log(resultado);
  });
}

main();
