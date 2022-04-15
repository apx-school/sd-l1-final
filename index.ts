import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function processInput(input) { //processInput selecciona que funcion aplicar en base al input ingresado en la terminal
  
  const controller = new PelisController;

  if (input._[0] == "add"){
    const peliToAdd:Peli = {
      id:input.id,
      title:input.title,
      tags: input.tags
    };
    return controller.add(peliToAdd).then((r)=>{
      return r;
    });

  } else if (input._[0] == "get"){

    const idToGet = {id: input._[1]}
    return controller.get(idToGet).then((r)=>{
      return r;
    });

  }else if (input._[0] == "search"){
    let param = {}; //param fijara los parametros de busqueda, ya que pueden ser 1 o 2, para la funcion get
    if (input.title){
      param["title"] = input.title; //si ingresaron buscar un title, se agregará
    }
    if (input.tag){
      param["tag"] = input.tag; //si ingresaron buscar un tag, se agregará
    }
    return controller.get({search: param}).then((r)=>{ //agregue {search:} como key para la propiedad y objeto params, para poder buscarla
      return r;
    });
  } else {
    return controller.pelis.getAll().then((r)=>{
    return r;}
    )
  }
}


function main() {
  const params = parseaParams(process.argv.slice(2));

  const resultado = processInput(params);
  
  resultado.then((r)=>{console.log(r)});
  
}

main();
