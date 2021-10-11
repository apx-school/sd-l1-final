import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resMinimist = minimist(argv);

  if (resMinimist._[0] == "search" && resMinimist.title && resMinimist.tag) {
    return { search: { title: resMinimist.title, tag: resMinimist.tag } };
 } else if (resMinimist._[0] == "search" && resMinimist.title) {
    return { search: { title: resMinimist.title } };
 } else if (resMinimist._[0] == "search" && resMinimist.tag) {
    return { search: { tag: resMinimist.tag } };
 } else if (resMinimist._[0] == "get") {
    return { id: resMinimist._[1] };
 } else if (resMinimist._[0] == "add") {
     return {
       id: resMinimist.id,
       title: resMinimist.title,
       tags: resMinimist.tags
    };
 } else {
    return {};
 }
}

function comandos(parametros) {
  const controller = new PelisController();
  if(parametros.id && parametros.title && parametros.tags) {
    return controller.add(parametros).then((respuesta)=> {
      console.log(respuesta);
    });
  }else if(parametros.search || parametros.id) {
    return controller.get(parametros).then((resultado)=> {
      console.log(resultado);
    })
  }else {
    return controller.get({}).then((resultado) => {
      console.log(resultado);
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
