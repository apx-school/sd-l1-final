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

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(__dirname + "/pelis.json");
  }

  async getById(id: number): Promise<Peli> {
    const allMovies = await this.getAll();
    return allMovies.find((movie) => movie.id === id);
  }

  async add(peli: Peli): Promise<boolean> {
    const moviesList = await this.getAll();

    const existingMovie = moviesList.find((movie) => movie.id === peli.id);

    if (existingMovie) {
      console.error("Ya existe una película con ese ID");
      return false;
    } else {
      moviesList.push(peli);
      await jsonfile.writeFile(__dirname + "/pelis.json", moviesList);
      console.log("Película guardada con éxito");
      return true;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const moviesList = await this.getAll();

    const filteredList = moviesList.filter((movie) => {
      let applyParam = true;
      if (options.tag && !movie.tags.some((tag) => tag === options.tag)) {
        applyParam = false;
      }
      if (options.title && !movie.title.includes(options.title)) {
        applyParam = false;
      }
      return applyParam;
    });

    return filteredList;
  }
}

export { PelisCollection, Peli };
