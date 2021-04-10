import { PelisCollection, Peli } from "./models";
import * as isEmpty from "lodash/isEmpty"

class PelisController {
  movies: PelisCollection;
  constructor() {
    this.movies = new PelisCollection();  // Instancio pelisCollection();
  }

  get(options: any) {
    if (options.hasOwnProperty("id")) {
      return this.movies.getById(options.id)
    } 
    if (options.hasOwnProperty("search")) {
      return this.movies.search(options.search)
    } 
    if(isEmpty(options)) {
      return this.movies.getAll();
    }
  }

  add(pelicula: Peli) {
    this.movies.add(pelicula)
  }
}

export { PelisController };
