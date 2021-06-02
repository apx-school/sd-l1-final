import * as minimist from "minimist";

import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}
function processOptions(argv){
  const controller = new PelisController()
  if(argv._[0]=="get"){
    const idNumber=argv._[1]
    //console.log("id", idNumber)
    return controller.get({id:idNumber})
      .then((respuesta)=>{return respuesta})
  }
  if(argv._[0]=="search"){
    var obj = {}
    if(argv.title){obj={title: argv.title}}
    if(argv.tag){obj={tag: argv.tag}}
    if(argv.title && argv.tag){obj={
      title: argv.title,
      tag: argv.tag
    }}
    return controller.get({search: obj})
      .then((respuesta)=>{return respuesta})
  }
  if(argv._[0]=="add"){
    var peli = {
      id: argv.id,
      title: argv.title,
      tags: argv.tag
    }
    return controller.add(peli)
      .then((respuesta)=>{return respuesta})
  }else{
    return controller.peliculas.getAll()
      .then((resultado)=>{return resultado})
  }
  
}

function main() {
 const params = parseaParams(process.argv.slice(2));
 const resultadoParams = processOptions(params)
 resultadoParams.then((result)=>{console.table(result)})
 console.log(params);
}

main();
