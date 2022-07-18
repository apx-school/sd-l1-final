import * as minimist from "minimist";
import { PelisController } from "./controllers";


function parseaParams(argv) {
  const resultado = minimist(argv);

const peliscontroller = new PelisController

const primerResultado = resultado._;

const segundoResultado = primerResultado[0];

if(segundoResultado == "get"){
  return peliscontroller.get({id: primerResultado[1]})
}
else if(segundoResultado == "search"){
  return peliscontroller.get ({search: resultado})
}

else if(segundoResultado == "add"){
  const PeliculaAgregada = {
    id: resultado.id,
    title: resultado.title,
    tags: resultado.tags
  }
  return peliscontroller.pelis.add(PeliculaAgregada)
}
 
return peliscontroller.pelis.getAll();

}

  

async function main(){
  const tercerResultado = await parseaParams (process.argv.slice(2));
  console.log(tercerResultado)
}

main();


