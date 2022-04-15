import * as minimist from "minimist";
import { parse } from "node:path";
import { title } from "node:process";
import { PelisController } from "./controllers";

function parseaParams (argv){
  const parsear = minimist(argv)
  //console.log("parsear",parsear)
  return parsear
}


function processOptions(argv) {
  const controller = new PelisController();


  if(argv._[0]== 'get'){
    const idComando = argv._[1]
    //console.log("id",idComando)
    return controller.get({id:idComando}).then((res)=>{return res})
  }


  if(argv._[0]== "search"){
    //console.log("lalalala",argsParseados._[0],"sssss")
    var obj = {}
    if(argv.title && argv.tag ){
      var comandoTitle = argv.title
      //console.log("comandoTitle",comandoTitle)
      obj = {
        title : argv.title,
        tag : argv.tag
      };
    }else
    if (argv.title){
      obj = {
        title : argv.title
      };
    }else
    if(argv.tag){
      obj = {
        tag : argv.tag
      }
    }
    return controller.get({search:obj}).then((res)=>{return res})
  };
 

  if(argv._[0]== "add"){
    var peli = {
      id : argv.id,
      title : argv.title,
      tags : argv.tags
    };
    return controller.add(peli).then((res)=>{return res})
  }else{
    return controller.listaDePeliculas.getAll().then((res)=>{return res})
  };

}



function main() {
  const parseador = parseaParams(process.argv.slice(2))
  //console.log("parseador",parseador)
  const comandos = processOptions(parseador)
  comandos.then((res)=>{
    console.log(res)
  })

  



 
};
main();
