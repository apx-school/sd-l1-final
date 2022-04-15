import * as minimist from "minimist"
import {PelisController} from "./controllers"

function ejecutandoLosComandos(parametro){
  const pelisController = new  PelisController();
  if(parametro.title && parametro.id && parametro.tags) {
    return pelisController.add(parametro).then((item) => console.log(item));
  } else if (parametro.search || parametro.id){
    return pelisController.get(parametro).then((r) => console.log(r));
  } else if (parametro == 0){
    return pelisController.get({}).then((respuesta) => console.log(respuesta))
  }
}

function parseaParams(argv) {
  const resultado = minimist(argv);
  if(resultado._[0] == "get") {
    return { id:resultado._[1] }
  } else if (resultado._[0] == "search" && resultado.title && resultado.tag){
    return { search: { title: resultado.title, tag: resultado.tag}};
  } else if (resultado._[0] == "search" && resultado.title) {
    return { search: {title: resultado.title}};
  } else if (resultado._[0] == "search" && resultado.tag) {
    return { search: {tag: resultado.tag}};
  } else if (resultado._[0] == "add"){
    return { title: resultado.title, id: resultado.id, tags: resultado.tags};
  } else {
    return 0
  }
}


function main() {
  const params= parseaParams(process.argv.slice(2));
  ejecutandoLosComandos(params)
}

main()