import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  if(resultado._[0]=="add"){
    delete resultado._
    return resultado
 }else if(resultado._[0]=="search"){
    delete resultado._
    return {search:resultado}
  }else if (resultado._[0]=="get"){
    return {id:resultado._[1]}
  }else if (resultado._[0]==undefined){
    return ["all"]
  }else{console.warn("Error:El/los parametro/s es/son incorrecto/s.")}
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const func = minimist(process.argv.slice(2))._[0];
  const controller = new PelisController

  const map={
    get:p=>controller.get(p),
    search:p=>controller.get(p),
    add:p=>controller.add(p),
    undefined:p=>controller.get(p)
  }
  map[func](params).then(rtta=>{
    if(rtta===true){
      console.log("Película agregada.")
    }else if(rtta===false){
      console.warn("Error al agregar la pelicula. El id ya existe")
    }else{
      console.log(rtta)
    };
  })


 // console.log(params);
}

main();
