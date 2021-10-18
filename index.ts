import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv){
  const argParseado = minimist(argv);
  if (argParseado._[0] == "search" && argParseado.title && argParseado.tag) {
    return {search : {title : argParseado.title , tag : argParseado.tag}}
    } else if (argParseado._[0] == "search" && argParseado.title){
      return {search : {title : argParseado.title}}
    } else if ( argParseado._[0] == "search" && argParseado.tag){
       return {search : {tags : argParseado.tag}}
    } else if ( argParseado._[0] == "get"){
      return {id : argParseado._[1]}
    } else if ( argParseado._[0] == "add"){
      return {
        id : argParseado.id,
        title : argParseado.title,
        tags : argParseado.tags
      };
    }  else {
        return {};
    }
}

function paramsForController(params){
  const controller = new PelisController()
  if (params.id && params.title && params.tags){
    return controller.add(params).then((r) => {
      console.log(r);
    });
  }  else if (params.search || params.id){
      return controller.get(params).then((r) => {
        console.log (r);
    })} else {
      return controller.get({}).then((r) => {
        console.log(r)
    })
  }     
}

function main(){
  const argumentos = process.argv.slice(2)
  const argParse = parseaParams(argumentos);
  paramsForController(argParse)
};

main();
