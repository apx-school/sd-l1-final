import * as minimist from "minimist";
import { argv, title } from "node:process";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function optionParams (params){
  const controller = new PelisController

  if (params._[0] == "get"){
    const id = params._[1];
    return  controller.get({id:id}).then((res)=> {
      return res});

  } else if(params._[0] == "add"){
    let peli = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    return  controller.add(peli).then((res)=>{
      return res
    })
  } else if (params._[0] == "search"){
   let opciones = {}
   if (params.title || params.tags){
    opciones = { 
      title: params.title,
      tags: params.tags
    } ;
   }
   if (params.tags){
     opciones = {
       tags: params.tags
   }
  }
   return  controller.get({search:opciones}).then((res)=>{
     return res
   })
 } else if (params.length == 0){
   return controller.get([]).then((res)=> {
     return res
   })
 }
}

function main() {
    const params = parseaParams(process.argv.slice(2));
    const finalResult = optionParams(params);
    finalResult.then((res)=> console.log(res));
}
main()
