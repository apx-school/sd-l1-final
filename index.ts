import * as minimist from "minimist";
import  {PelisController} from "./controllers"

// parseo los argumentos
function parseaParams(argv) {
  const resultado = minimist(argv);
  // console.log(resultado)
  return resultado;
}

function options(params){
  const controller = new PelisController();

  if(params._[0] == "add"){// si lo que ingreso en la 1er posicion es add then borro el ._ y retorno la funci. add
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
  const params = parseaParams(process.argv.slice(2));//le paso los argu. sin las primeras 2 posiciones
  const optionPelis = options(params)// a options le paso los parametros que ingrese ya parseados
  optionPelis.then((result) => {// devuelvo una promesa
  console.log(result)
  })
}

main();
