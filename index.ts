import * as minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);

  const options = resultado._[0];

  if(options == "get"){
    return {id: resultado._[1]}
  }
  else if(options == "search"){
    if (resultado.title && resultado.tags){
      return  {search: {title: resultado.title, tag: resultado.tag}}
    }
    else if(resultado.title){
      return {search: {title: resultado.title}}
    }
    else if(resultado.tag){
      return {search: {tag: resultado.tag}}
    }
    else if(options == "add"){
      return {
        add: { id: resultado.id, title: resultado.title, tags: resultado.tags }
      }
    }
    else {
      return {all: 1}
    }
      
    
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  
  const resultado = new PelisController()
  resultado.get(params).then((p)=>{
    console.log(p)
  })
}

main();
