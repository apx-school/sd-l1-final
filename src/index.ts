import minimist from "minimist";
import { Peli, PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisCollection();

  if(params._[0] === "add"){
    const peli: Peli = {
      id: params.id,
      title: params.title,
      tags: params.tags || [],
    }

    const resultado = await pelisController.add(peli)
    console.log(resultado ? "Peli agregada con exito" : "Error al cargar peli");
    
  } else if(params._[0] === "get"){
    const id = Number(params._[1])
    const peli = await pelisController.getById(id);
    console.log(peli ? peli : "Película no encontrada.");
  } else if(params._[0] === "search"){
    const options = {
      search: {
        title: params.title,
        tag: params.tag
      }
    }
    const pelis: Peli[] = await pelisController.search(options);
    console.log(pelis.length > 0 ? pelis : "No se encontraron resultados");
  } else{
    const pelis = await pelisController.getAll();
    console.log(pelis);
    
  }

  

  console.log(params);
}

main();
