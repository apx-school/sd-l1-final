
import { json } from "stream/consumers";
import { PelisCollection, Peli } from "./models";
let jsonFile = require('jsonfile');

type Options = {
  id?: number; 
  search?:{
    title?: string; 
    tag?: string; 
  };
}; 

class PelisController {
  model: PelisCollection; 
  constructor() {
    this.model = new PelisCollection; 
  }

  async get(options?: Options) {
    const peliculas = await this.model.getAll(); // Esperar la promesa
    console.log("Peliculas disponibles", peliculas); 
    if (options?.id) {
      const found = peliculas.find(pelicula => pelicula.id ===Number (options.id)) ;
      console.log("Pelicula encontrada con exito", found); 
      return  found || null; // Devuelve la película o null si no se encuentra
    }

    if (options?.search) {
      const { title, tag } = options.search; 
      console.log("Buscando películas con:", { title, tag });
      const resultado = peliculas.filter(pelicula => {
        const matchesTitle = title ? pelicula.title.toLowerCase().includes(title) : true; //buscamos si title esta en alguna pelicula
        const matchesTag = tag ? pelicula.tags.includes(tag) : true; // lo mismo con los tags. 
        console.log(`Evaluando película: ${pelicula.title}, matchesTitle: ${matchesTitle}, matchesTag: ${matchesTag}`); // Log de evaluación
        return matchesTitle && matchesTag; 
      });
      console.log("Resultados de la busqueda",resultado); 
      return resultado; 
    }

    return peliculas; // Si no hay opciones, devuelve todas las películas
  }

  async getOne(options: Options): Promise<Peli | null> {
    const result = await this.get(options);
    return result ? result[0] : null; // Devuelve el primer resultado o null
  }

  async add(peli: Peli): Promise<boolean> {
    const peliculas = await this.model.getAll(); // Esperar la promesa
    const peliConEseIdExiste = peliculas.some(p => p.id === peli.id); // Verificar si existe el id

    if (peliConEseIdExiste) {
      return false; // No se agrega porque el id ya existe
    }

    peliculas.push(peli);
    try {
      await jsonFile.writeFile ("./pelis.json", peliculas);
      return true; 
    }
    catch (err){
      console.error("No se ha podido agregar la pelicula", err); 
      return false;  
    }
  }
}


export { PelisController };
