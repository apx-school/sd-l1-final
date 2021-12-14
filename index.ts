import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const params = minimist(argv);
  if(params.search){
    return {search: params.search}
  }else if(params.get){
    
  }
  
}

function processOption(params){
  const controller = new PelisController();
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  //return processOption(params).then((res)=> console.log(res));
  
};
main();
