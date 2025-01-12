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
}
type SearchOptions = {title?: string; tag?: string}; 

class PelisCollection {
    async add(peli: Peli): Promise<boolean> {
      const peliExistente = await this.getById(peli.id);
      if (peliExistente) {
        return false; // No se agrega porque el id ya existe
      }
      const peliculasToJson = await this.getAll(); // Obtener todas las películas
      peliculasToJson.push(peli);
      await jsonfile.writeFile("./pelis.json", peliculasToJson);
      return true; // Se agregó correctamente
    }
    

  async getAll(): Promise<Peli[]> {
    try {
      const pelis = await jsonfile.readFile ("./pelis.json");
      console.log("Peliculas devueltas", pelis); 
      return pelis; 
    }
    catch (err){
      console.error("Error al leer el archivo", err);
      return [];
    }
  }

  getById(id: number): Promise<Peli> {
    return jsonfile.readFile("./pelis.json").then((pelis: Peli[]) => {
      return pelis.find(p => p.id === id); // find in pelis if we have a equal "id"
    });
  }
  async searchAnyFilm(options: SearchOptions) {
    const lista = await this.getAll(); 
    const listaFiltrada = lista.filter(function(cadaPelicula) {
      let flag = false; 
      if (options.tag) {
          if (cadaPelicula.title.includes (options.tag)) {
            flag = true; 
          }
        }
     if (options.title){
        if (cadaPelicula.title.includes(options.title)){
          flag = true; 
        }
     }
     return flag || (!options.title && !options.tag); 
    });
    return listaFiltrada; 
  }
}

export { PelisCollection, Peli };
