import { PelisController } from "./controllers";
import * as minimist from "minimist";
function parseaParams(argv){
  const resultado= minimist(argv);
  return resultado;
}

async function processOptions(args) {
  const controller=new PelisController();
  if(args._[0]==="get"){
    return  controller.get({id: args._[1]});
  }
  if(args._[0]==="search"){
    return controller.get({search: args})
  }
  if(args._[0]==="add"){
    return controller.add({id:args.id,title:args.title,tags:args.title});
  }
  if(!args._[0]){
    return controller.peliculas.getAll();
  }
}

function main(){
const argumentos=process.argv.slice(2);
const parsear= parseaParams(argumentos);
processOptions(parsear).then((r)=>{console.log(r )}) 

  
}
main();