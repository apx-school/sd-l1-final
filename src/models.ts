import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];


  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  } 
 
}

class PelisCollection { 
  
 async getAll(): Promise<Peli[]> {
    try {
      return await jsonfile.readFile("./src/pelis.json");
  } catch(error){
    if (error.code === "ENOENT")
    {
      return [];  
    }
    throw error;
  }
}

async add(peli: Peli): Promise<boolean> {  

    const peliculas = await this.getAll();

    // verifica si ya existe
    const  existe = peliculas.some(p => p.id === peli.id);
    if (existe) return false;

    peliculas.push(peli);
    await jsonfile.writeFile("./src/pelis.json", peliculas);
    return true;
  }

// Este fragmento de código define una función para agregar una película.
// Primero verifica si la película ya existe en el sistema. 
// Si no existe, crea un objeto con los datos de la película y lo guarda en un archivo JSON. 
// Finalmente, devuelve una promesa que indica si la operación fue exitosa.


async getById(id: number): Promise<Peli>{ 

  const peliculas = await this.getAll();
  console.log('Todas las películas:', peliculas); // Debug
  const  encontradas = peliculas.find(peliculas => peliculas.id === id);
  console.log('Encontrada:', encontradas); // Debug

  if (!encontradas){ 
    throw new  Error(`Peliculsa  con ID ${id} no encontrada`);
  }
  
  return encontradas;
} 

 async search(options:{title?:string, tag?:string}): Promise<Peli[]> {
    
  const lista = await this.getAll();
   return lista.filter(peli =>{
     const mathTitle = options.title?
     peli.title.includes(options.title):true;

     const mathTags = options.tag?
     peli.tags.includes(options.tag):true;
     
     return mathTitle && mathTags;
   });
  
  }
}
export { PelisCollection, Peli };
