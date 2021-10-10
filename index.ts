import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resMinimist = minimist(argv);

  if(resMinimist._[0] == "add") {
    return {
      title: resMinimist.title,
      id: resMinimist.id,
      tags: resMinimist.tags
    };
  } else if(resMinimist._[0] == "get"){
    return {id: resMinimist._[1]};
  }else if(resMinimist._[0] == "search") {
    return {search: resMinimist.title};
  }else if(resMinimist._[0] == "search") {
    return {search: resMinimist.tag};
  }else if(resMinimist._[0] == "search" && resMinimist.title && resMinimist.tag) {
    return {search: {title:resMinimist.title, tag: resMinimist.tag}};
  }else{
    return {};
  }
}

function comandos(parametros) {
  const controller = new PelisController();
  if(parametros.id && parametros.title && parametros.tags) {
    return controller.add(parametros).then((respuesta)=> {
      console.log(respuesta);
    });
  }else if(parametros.search || parametros.tags) {
    return controller.get(parametros).then((resultado)=> {
      console.log(resultado);
    })
  }else {
    return controller.get({}).then((resultado) => {
      resultado;
    })
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  comandos(params);
  //const parametrosTreminal = parsearParamsDeTerminal(peliculas, params)
  //console.log(parametrosTreminal);
  
 
};

main();
