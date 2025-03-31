import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli, PelisCollection } from "./models";
import _ from "lodash";


function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function accion(params){
  const controller = new PelisController();
  const accion1 = _.get(params, "_[0]");
  const accion2 = _.get(params, "_[1]");
  const objetoSinAccion = _.omit(params, "_");
  let resultado: Peli[] = [];

  if (accion1 && accion2) {
    resultado = await controller.get({id: accion2});
    //console.table(resultado);
  }else if(!accion1 && !accion2){return controller.model.getAll();}

    if(!accion2){
        if(accion1 === "add"){
          //console.log("accion a realizar",accion1);
          await controller.add(objetoSinAccion);
          resultado = await controller.model.getAll();
      }
      if(accion1 === "get"){
        resultado = await controller.get(objetoSinAccion);
      }
      if(accion1 === "search"){
        //console.log("accion a realizar", objetoSinAccion);
        resultado = await controller.get({search:objetoSinAccion});
      }
    }
    return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const model = new PelisCollection();
  const todasLasPelis = await model.getAll();
  const argumentos = _.get(params, "_");

  if(argumentos.length === 0){
    console.table(todasLasPelis);
  }else{
    //console.log(params);
    console.table(todasLasPelis);
    const respuesta = await accion(params);
    console.table(respuesta);
  }
}

main();
