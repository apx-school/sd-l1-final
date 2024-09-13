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

type SearchOptions = {
  title?: string;
  tag?: string;
}

class PelisCollection {

  // Metodo para obtener todas las peliculas
  /* async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("src/pelis.json").then((movies) => {
      // la respuesta de la promesa
      return movies;

      

    });
  } */
  
    async getAll(): Promise<Peli[]> {
      const movies = await jsonfile.readFile("src/pelis.json");
      return movies;
  }


  // Metodo para obtener una pelicula por id
  async getById(id: number): Promise<Peli | undefined> {
    const peliculas = await jsonfile.readFile("src/pelis.json");
    return peliculas.find((pelicula) => pelicula.id === id);
  }

  // Metodo para añadir una pelicula
  /* async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then(async (peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = await this.getAll();

        // Agregamos la pelicula que pasa por parametro
        data.push(peli);

        const promesaDos = jsonfile.writeFile("src/pelis.json", data);
  
        return promesaDos.then(() => {
          return true;
        });
      }
    });
  
    return promesaUno;
  } */

  async add(peli: Peli): Promise<boolean> {
    
    const peliExistente = await this.getById(peli.id);

    if(peliExistente) {
      return true;
    }

    const data = await this.getAll();
    // Agregamos la pelicula que pasa por parametro
    data.push(peli)

    try{
      await jsonfile.writeFile("src/pelis.json", data);
      return true;
    } catch(e){
      console.log("Error al escribir en el archivo", e);
      throw e;
    }
  }

  // Metodo para buscar peliculas por titulo y/o tag
  async search(options: SearchOptions){
    
    const peliculas = await this.getAll();
    
    if(options.title){
        return peliculas.filter((peli) => peli.title.toLowerCase().includes(options.title.toLowerCase()));
    } else if (options.tag){
        return peliculas.filter((peli) => peli.tags.includes(options.tag));
    } else if (options.title && options.tag){
        return peliculas.filter((peli) => peli.title.toLowerCase().includes(options.title.toLowerCase()) && peli.tags.includes(options.tag));
    }
  }

}
export { PelisCollection, Peli };
