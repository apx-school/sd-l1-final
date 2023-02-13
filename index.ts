import * as minimist from "minimist";
import { PelisController} from "./controllers";
//import { Peli } from "./models";

//type Options={
//  id?:number;
//  search?:{
//    title?:string;
//    tag?:string
//  }
//}

function parseaParams(argv) {
  const resultado = minimist(argv);
  
  const argumento=resultado._[0]
  console.log(argumento)
  if(argumento == "search"){
    if(resultado.title && resultado.tag){
      return {search:{title:resultado.title,tags:resultado.tag}}
    }else if(resultado.title){
      return {search:{title:resultado.title}}
    }else if(resultado.tag){
      return {search:{ tag: resultado.tag}}
    }
  }
  if(argumento == "get"){
    return {id:resultado._[1]}
  }
  if(argumento == "add"){
    return{add:{id:resultado.id,title:resultado.title,tags:resultado.tags}}
  }
  if(resultado!){
    return {}
  }
  //return {
  //  //add:true,
  //  //get:true,
  //  //id:resultado.id,
  //  search:{
  //    //title:resultado.title,
  //    tag:resultado.tag
  //  }
    //}
}
async function procesargmts(options?){
  const controller=  new PelisController()
  //let peli={id:options.id,title:options.search.title ,tags:options.search.tag}
  //let array = []
  if(options.search){
     //let objsearch= {search:{title:options.title,tag:options.tag}}
       return await controller.get(options)
      //return  respuesta
    }      
  if(options.id){
   // let obj={id:options.id}
return await controller.get(options)
  //console.log(obj)
  }
  if(options.add){
    return await controller.add(options.add)
  }else{
    return await controller.get(options)
  }
}
 
  

async function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params)
  let respuesta= await procesargmts(params)
  console.log(respuesta)
 //return respuesta
 
}

main()
