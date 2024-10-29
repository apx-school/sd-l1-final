import minimist from "minimist";
import { PelisController } from "./controllers"
import { PelisCollection, Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const listaDePeliculas = new PelisController();

  if(params._[0] === "add" ){
    const nuevaPeli: Peli = {
      id: Number (params.id),
      title: params.title,  
      tags: Array.isArray(params.tags) ? params.tags : params.tags.split(','),
    };
    const resultado = await listaDePeliculas.add(nuevaPeli);
  }
  else if(params._[0] === "get" ){
    const resultado = await (listaDePeliculas.get({id : params._[1]}));
    console.log(resultado);
    
  }
  else if(params._[0] === "search" ){
    const resultado = await listaDePeliculas.coleccionPelis.search({ title: params.title, tag: params.tag });
    console.log(resultado);
  }
  else {console.log(await listaDePeliculas.get());}
  
}

main();
