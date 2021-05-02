import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function processOptions(options){
 const controller =new PelisController();
 if(options._[0]=="add"){
   var nuevaPeli={
     id:options.id,
     title:options.title,
     tags:options.tags
   };
   return controller.add(nuevaPeli).then((respuesta)=>{
     return respuesta;
   })
 } else if(options._[0]=="get"){
   const idNumber=options._[1];
   return controller.get({id:idNumber}).then((respuesta)=>{
     return respuesta;
   });
 } else if (options._[0]=="search"){
   let propiedad ={};
   if(options.title){
     propiedad["title"]=options.title;
   }
   if(options.tag){
     propiedad["tag"]=options.tag;
   }
   return controller.get({search:propiedad}).then((respuesta)=>{
     return respuesta;
   })
 } else if(options._.length==0){
   return controller.get([]).then((respuesta)=>{
     return respuesta;
   });
 }
}



function main() {

  const params = parseaParams(process.argv.slice(2));
  const resultadoFinal = processOptions(params);
  resultadoFinal.then((result)=>console.log(result))
}

main();
