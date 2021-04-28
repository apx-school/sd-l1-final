import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado
}
 
function processOptions(argv){
  const control = new PelisController()

  if(argv._[0] === "get"){
    const id = argv._[1]
    return control.get({id:id}).then((res)=>{
      return res
    })
  }else if(argv._[0] === "search"){
    let params = {}
    if(argv.title){
      params["title"] = argv.title
    } if(argv.tag){
     params["tag"] = argv.tag
    }
    return control.get({search:params}).then((res)=>{
      return res
    });
  }else if(argv._[0] === "add"){
    let peliNueva = {
      id: argv.id,
      title: argv.title,
      tags:argv.tags
    };
    return control.add(peliNueva).then((res)=>{
      return res
    });
  } if(argv._[0] === 0){
    return control.get([]).then((res)=>{
      return res
    })
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado2 =  processOptions(params)
  resultado2.then((res)=> console.log(res))
}

main();
