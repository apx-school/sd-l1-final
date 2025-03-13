import minimist from 'minimist';
import { PelisController } from './controllers';
import { Peli } from './models';

function parseaParams(argv:string[]) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2)); //el slice es para saltear las 
  const controller = new PelisController();
  const command = params._[0];

  switch(command){
    case"add":
      try{
        const id = params.id;
        const title = params.title;
        const tags = params.tags;
      
        if(id && title && tags){
          const peli = { id, title, tags: Array.isArray(tags) ? tags : [tags] };
          const agregar = await this.controller.add(peli);
        
          if(agregar){
            console.log("Pelicula agregada exitosamente");
          }else{
            console.log("No se pudo agregar la pelicula");
          }
        }else{
          console.log("faltan argumentos para agregar la pelicula");
        }
      

      }catch(error){
        console.error("error al guardar la pelicula", error);
      }
      break;

      case "get":
        try{
          const id = params._[1];
          
          if(id){
            const peli = await controller.get({ id: parseInt(id) });
            console.log(peli);
          }
        }catch(error){
          console.error("error :", error);
        }
        break;

        case "search": 
        try {
          const searchTitle = params.title; 
          const searchTag = params.tag; 

          if (searchTitle || searchTag) {
            const pelis = await controller.get({ search: { title: searchTitle, tag: searchTag } }); 
            console.log(pelis); 
          } else {
            console.log("Error: Debes proporcionar al menos un criterio de búsqueda (title o tag)."); 
          }
        } catch (error) {
          console.error("Error al buscar películas:", error.message); 
        }
        break;

      default: 
        try {
          const allPelis = await controller.get(); 
          console.log(allPelis); 
        } catch (error) {
          console.error("Error al obtener todas las películas:", error.message); 
        }
        break;
    }
    
  }

main();
