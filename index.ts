import * as minimist from "minimist";
import { argv, title } from "node:process";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function optionParams (params){
  var resultado;
  const controller = new PelisController

  if (params._[0] == "get"){
    const id = params[1];
    return resultado = controller.get({id:id}).then((res)=> {
      return res});
  };
  if(params[0] == "add"){
    let peli = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    return resultado = controller.add(peli).then((res)=>{
      return res
    })
  }

  if (params[0] == "search"){
   let opciones = {}
   if (params.title){
    opciones = { 
      title: params.title} 
   }
   if (params.tags){
     opciones = {
       tags: params.tags
   }
  }
   return resultado = controller.get({search:opciones}).then((res)=>{
     return res
   })
 } else if (params.length == 0){
   return resultado = controller.get({}).then((res)=> {
     return res
   })
 }
 console.log(resultado)
 return resultado
}

function main() {
    const params = parseaParams(process.argv.slice(2));
    const finalResult = optionParams(params);
    finalResult.then((res)=> console.log(res));
}
main()
