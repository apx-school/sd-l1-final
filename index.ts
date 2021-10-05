import * as minimist from "minimist";
import {PelisController} from "./controllers";
import {Peli} from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function paramsParaAdd(res){
  let resultadoAdd: Peli;
  if(res._[0] == "add"){
    resultadoAdd = {
      id: res.id,
      title: res.title,
      tags: res.tags,
    };
    return resultadoAdd;
  }
}

function paramsGet(res){
  if(res._[0] == "get"){
    return{
      id: res._[1],
    }
  }else if(res._[0] == "search"){
    if(res.title && res.tag){
      return{
        title: res.title,
        tag: res.tag,
      };
    }else if(res.title){
      return{
        title: res.title,
      };
    }else if(res.tag){
      return{
        tag: res.tag,
      };
    }
  }else{
    return{};
  }
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  if (params._[0] == "add"){
    const objParmas = paramsParaAdd(params);
    const resultado = controller.add(objParmas);
    resultado.then(()=> console.log("Pelicula agregada"));
  }else{
    const objParmas = paramsGet(params);
    const resultado = controller.get(objParmas);
    resultado.then((r)=>console.log(r));
  }
}

main();
