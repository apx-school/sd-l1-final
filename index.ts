
import * as minimist from "minimist";
import { PelisController } from "./controllers";

function ejecutarComandos(params){
  const controller = new PelisController
  if(params.id && params.title && params.tags){
      return controller.add(params).then(respuesta=>console.log(respuesta))}
  else if(params.search || params.id){
      return controller.get(params).then(respuesta=>console.log(respuesta))}
  else if (params == 0){
      return controller.get({}).then(respuesta=>console.log(respuesta))}
}


function parseaParams(argv) {
  const parseo = minimist(argv);
  if (parseo._[0] == "get") {
    return { id: parseo._[1] };
  } else if (parseo._[0] == "search" && parseo.title && parseo.tag) {
    return { search: { title: parseo.title, tag: parseo.tag } };
  } else if (parseo._[0] == "search" && parseo.title) {
    return { search: { title: parseo.title } };
  } else if (parseo._[0] == "search" && parseo.tag) {
    return { search: { tag: parseo.tag } };
  } else if (parseo._[0] == "add") {
    return { id: parseo.id, title: parseo.title, tags: parseo.tags };
  }else{return 0}
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutarComandos(params)
}

main();
