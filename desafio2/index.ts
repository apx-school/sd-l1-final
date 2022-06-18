import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  const controller = new PelisController;
  
const parUno = resultado._;

const parDos = parUno[0];

if (parDos === "get") {
  return controller.get({id: parUno[1]})
} 
else if (parDos === "search") {

  return controller.get ({search: resultado})
}
else if (parDos === "add") {

  const newFilm = {
    id: resultado.id,
    title: resultado.title,
    tags: resultado.tags
  }

  return controller.add(newFilm);
}

return controller.peliculas.getAll();

}

async function main(){
  const parTres = await parseaParams (process.argv.slice(2));
  console.log(parTres)
}

main();


