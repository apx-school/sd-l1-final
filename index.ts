import * as minimist from "minimist";
import  {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);
  // console.log(resultado)
  return resultado;
}

function options(params){
  const controller = new PelisController();

  if(params._[0] == "add"){
    delete params._;
    return controller.add(params);
  } else if(params._[0] == "search"){
    delete params._;
    return (controller.getOptions({"search" : params }));
  } else if(params._[0] == "get"){
    return controller.getOptions({"id": params._[1]});
  } else {
    return controller.getOptions({});
  }
  
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const optionPelis = options(params)
  optionPelis.then((result) => {
  console.log(result)
  })
}

main();
