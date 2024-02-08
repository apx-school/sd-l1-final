import * as jsonfile from "jsonfile";

type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  movies: Peli[] = [];

  constructor() {
    jsonfile.readFile(__dirname + "/pelis.json").then((movies) => {
      this.movies = movies;
    });
  }

  async getAll(): Promise<Peli[]> {
    const movies = await jsonfile.readFile(__dirname + "/pelis.json");
    return movies;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false;
    } else {
      this.movies.push(peli);
      await jsonfile.writeFile(__dirname + "/pelis.json", this.movies);
      return true;
    }
  }

  async getById(id: number): Promise<Peli> {
    const movies = await this.getAll();
    const movie = movies.find((m) => m.id === id);
    return movie;
  }

  async search(options?: SearchOptions): Promise<Peli[]> {
    const movies = await this.getAll();
    const searchMovies = await movies.filter((movie) => {
      let flag = false;

      if (options.title && !options.tag) {
        flag = movie.title.includes(options.title);
      } else if (options.tag && !options.title) {
        flag = movie.tags.includes(options.tag);
      } else {
        flag =
          movie.tags.includes(options.tag) &&
          movie.title.includes(options.title);
      }
      return flag;
    });
    return searchMovies;
  }
}

export { PelisCollection, Peli, SearchOptions };
