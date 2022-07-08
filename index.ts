import * as minimist from "minimist";
import { resourceLimits } from "worker_threads";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  const options = resultado._[0];

   if (options == "get"){
    return { id : resultado._[1]};
   }else if (options == "search"){
    if (resultado.search && resultado.tag) {
      return {search : {title: resultado.title, tags: resultado.tag}}
    }else if (resultado.title){
      return {search : {title: resultado.title}};
    }else if (resultado.tag){
      return {search : {tags: resultado.tag}};
    };
   
  }else if(options == "add"){
    return {add :{id: resultado.id, title : resultado.title, tags : resultado.tags}};
  }else {
    return {all : 1};
  }

  
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliculas = new PelisController;
  peliculas.get(params).then((resultadoFinal) =>{
    console.log(resultadoFinal);
  });
  
}

main();
