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

class SearchOptions {
  title?: string;
  tag?: string;
}

class PelisCollection {

  async getAll():Promise<Peli[]> {
    // Obtengo el array de peliculas del archivo pelis.json
    const pelis = await jsonfile.readFile(__dirname + "/pelis.json");
    // Devuelvo el array de peliculas
    return pelis;
  }

  async getById(id:number):Promise<Peli> {
    // Uso la funcion getAll para obtener todas las peliculas
    const pelis = await this.getAll();
    // Obtengo la pelicula cuyo id es igual al id que recibo por parametro
    const resultadoDeBusqueda = pelis.find((peli) => {
      return peli.id === id;
    });
    // Retorno la pelicula
    return resultadoDeBusqueda;
  }

  async add(peli:Peli):Promise<boolean> {
    // Uso la funcion getAll para obtener todas las peliculas
    const pelis = await this.getAll();
    // Busco si la pelicula ya existe en el array de peliculas
    const peliResultanteDeBusqueda = pelis.find((peliDelArray) => {
      return peliDelArray.id === peli.id;
    });
    // Si la pelicula existe    
    if (peliResultanteDeBusqueda) {      
      // Devuelvo false
      return false;
    } else { // Si la pelicula no existe
      // Agrego la pelicula al array de peliculas
      pelis.push(peli);
      // Guardo el array de peliculas en el archivo pelis.json
      await jsonfile.writeFile(__dirname + "/pelis.json", pelis);
      // Devuelvo true
      return true;
    }
  }

  async search(options:SearchOptions):Promise<Peli[]> {
    // Uso la funcion getAll para obtener todas las peliculas
    const pelis = await this.getAll();
    // Filtro las peliculas segun los parametros que recibo
    const resultadosDelFiltro = pelis.filter((peli) => {
      if (options.title && options.tag) {
        // Si recibo los parametros title y tag, devuelvo las peliculas cuyo titulo incluya el parametro title y cuyos tags incluyan el parametro tag
        return peli.title.includes(options.title) && peli.tags.includes(options.tag);
      }
      // Si recibo el parametro title, devuelvo las peliculas cuyo titulo incluya el parametro title
      if (options.title) {
        return peli.title.includes(options.title);
      }
      // Si recibo el parametro tag, devuelvo las peliculas cuyos tags incluyan el parametro tag
      if (options.tag) {
        return peli.tags.includes(options.tag);
      }
    });
    // Devuelvo las peliculas que cumplen con el filtro
    return resultadosDelFiltro;
  }
}

export { PelisCollection, Peli };