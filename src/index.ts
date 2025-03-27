import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}


async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  if (params._.includes("search")) {
    const result = await controller.get({ search: { title: params.title, tag: params.tag } });
      console.log(result);
    } else if (params._.includes("get")) {
      if (params.id) {
        const result = await controller.get({ id: params.id });
        console.log(result);
      }      
  }else if(params._.includes("add")){
    const tags = params.tags ? (Array.isArray(params.tags) ? params.tags : [params.tags]) : [];
    const peli: Peli = {
      id: params.id,
      title: params.title,
      tags: tags,
    }
    if(!peli.id || !peli.title || !peli.tags){
        console.log("Faltan parámetros obligatorios para agregar la película.");
        return;
      }
      try{
        const result = await controller.add(peli)
        if(result) {
          console.log("Pelicula agregada:", result)
        } 
      } catch (error) {
        console.log("Error al agregar la pelicula", error)
      } 
  } else if (params._.length === 0) { // Si no se proporciona ningún comando
    const result = await controller.getAll();
    console.log(result);
  } else {
    console.log("Comando no reconocido.");
  }
}
main().catch((error) => {
  console.error("Error general:", error);
});
