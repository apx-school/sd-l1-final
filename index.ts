import * as minimist from "minimist";

import  { PelisController } from "./controllers"

function parseaParams(argv) {
  var resultado = minimist(argv);
  return resultado;
}

async function processOptions(args){
  const controller = new PelisController ()
  if (args.add){
    return await controller.add({
      id:args.id,
      title:args.title,
      tags:args.tags
    })
  .then((res)=> {return res})
  }
 else if (args.get){
    return await controller.get({id:13})
  }
 else if (args.search){
    return await controller.get({search:args.title, tag:args.tag})
  }
else  if (args.empty){
    return await controller.get({empty: "empty"} )

  }

}
 function main() {
 
  const params = parseaParams(process.argv.slice(2));
 console.log(params)
  return processOptions(params).then((res)=> {
    return console.log(res)
  })
 
}

main();
