import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  constructor() {
    this.movies = new PelisCollection();  // Instancio pelisCollection();
  }

  get(options: any) {
    if (options.hasOwnProperty("id")) {
      return this.movies.getById(options.id)
    } else if (options.hasOwnProperty("search")) {
      return this.movies.search(options.search)
    } else {
      return this.movies.getAll();
    }
  }

  add(pelicula: Peli) {
    this.movies.add(pelicula)
  }
}

export { PelisController };
