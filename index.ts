import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  if(resultado._[0] == "get") {
    return {id : resultado._[1]};
  } else if (resultado._[0] == "search" && resultado.title && resultado.tags) {
    return { search : {title: resultado.titl, tags: resultado.tags }}
  } else if (resultado._[0] == "search" && resultado.title){
    return { search: { title: resultado.title}};
  } else if (resultado._[0] == "search" && resultado.tags) {
    return { search: { tags: resultado.tags}};
  } else if (resultado._[0] == "add"){
    return { title: resultado.title, id: resultado.id, tags: resultado.tags};
  } else {return 0}
   
};

function ejecutar(params){
  const test = new PelisController();

  if (params.search || params.id){
    return test.get(params).then((respuesta) => console.log(respuesta));
  } else if (params == 0){
    return test.get({}).then((respuesta) => console.log(respuesta));
  } else if (params.title && params.id && params.tags){
    return test.add(params).then((respuesta) => console.log(respuesta));
  }
}
function main() {
  const params = parseaParams(process.argv.slice(2));

  ejecutar(params);
}

main();
