import * as minimist from "minimist";
import {PelisController} from "./controllers";
import {PelisCollection} from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if (resultado.search){
    return {search: resultado.search};
  }else{

    return resultado;
  }

}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const parsedArguments = parseaParams(params);
  const parsedController = new PelisController();
  parsedController.get(parsedArguments).then((r)=>{

    console.log(params);  
  })


}

main();
