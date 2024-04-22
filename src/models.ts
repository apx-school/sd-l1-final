import * as jsonfile from "jsonfile"; // Importa el módulo jsonfile para trabajar con archivos JSON.

type SearchOptions = { title?: string; tag?: string }; // Define un tipo para las opciones de búsqueda, que pueden incluir título y/o etiqueta.

// no modificar estas propiedades, agregar todas las que quieras
// Define la clase Peli con propiedades id, título y etiquetas.
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  movies: Peli[] = []; //Inicializa una propiedad 'movies' como un array vacío para almacenar las películas.

  constructor() {
    jsonfile.readFile(__dirname + "/pelis.json").then((movies) => {
      this.movies = movies; // Lee el archivo de películas y almacena los datos en la propiedad 'movies'.
    });
  }

  async getAll(): Promise<Peli[]> {
    const movies = await jsonfile.readFile(__dirname + "/pelis.json"); //Asíncronamente lee el archivo JSON y retorna las películas.
    return movies;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id); // Verifica si ya existe una película con el mismo ID.

    if (peliExistente) {
      return false; // Si la película existe, retorna false.
    } else {
      this.movies.push(peli); // Agrega la nueva película al array 'movies'.
      await jsonfile.writeFile(__dirname + "/pelis.json", this.movies); // Escribe el array actualizado al archivo JSON.
      return true; // Retorna true si la película fue agregada exitosamente.
    }
  }

  async getById(id: number): Promise<Peli> {
    const movies = await this.getAll(); // Obtiene todas las películas.
    const movie = movies.find((m) => m.id === id); // Encuentra la película con el ID especificado.
    return movie; // Retorna la película encontrada, o undefined si no existe.
  }

  async search(options?: SearchOptions): Promise<Peli[]> {
    const movies = await this.getAll(); // Obtiene todas las películas.
    const searchMovies = await movies.filter((movie) => {
      let flag = false;

      if (options.title && !options.tag) {
        flag = movie.title.includes(options.title); // Busca películas que contengan el título especificado.
      } else if (options.tag && !options.title) {
        flag = movie.tags.includes(options.tag); // Busca películas que contengan la etiqueta especificada.
      } else {
        flag =
          movie.tags.includes(options.tag) &&
          movie.title.includes(options.title); //Busca películas que contengan tanto la etiqueta como el título especificados.
      }
      return flag; // Retorna true si la película cumple con los criterios de búsqueda.
    });
    return searchMovies; // Retorna las películas que cumplen con los criterios de búsqueda.
  }
}

export { PelisCollection, Peli, SearchOptions }; // Exporta las clases y tipos definidos para ser utilizados en otros módulos.
