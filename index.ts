import { PelisController } from "./controllers";


var minimist = require('minimist');

function parseaParams(argv) {
  const resultado = minimist(argv);
  
  return resultado;
}



 function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliculaController = new PelisController();


  if(params._[0] === undefined){

      return peliculaController.get().then(p=>console.log(p));

  }else if (params._[0] === "get"){
    if(typeof(params._[1]) !== "number"){
      return console.log("No ingresaste un numero de ID para buscar la pelicula")
    }else {
      return peliculaController.get({id:params._[1]}).then(p => console.log(p));
    }
    
  }else if(params._[0]==="add"){
    return peliculaController.add({
      id: params.id,
      title:params.title,
      tags:params.tags
    }).then(p=>console.log(p));

  }else if(params._[0] ==="search"){
    
    return peliculaController.get({search:{title:params.title, tag:params.tag}}).then(p => console.log(p));

  }else {

    return console.log("Parametros inexistentes");
  }
    
}
  

main();
