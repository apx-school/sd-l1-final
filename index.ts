import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}
function processInput(input) {

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
    let param = {};
    if (input.title){
      param["title"] = input.title;
    }
    if (input.tag){
      param["tag"] = input.tag;
    }
    return controller.get({search: param}).then((r)=>{
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
