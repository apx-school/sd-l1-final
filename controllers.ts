

import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  promise: Promise<any>;
  constructor() {
    this.movies = new PelisCollection()
  }
  get(options): Promise<any> {
    let result
    if (options.id) {
      result = this.movies.getById(options.id);
    }
    if (options.search) {
      result = this.movies.search(options.search);
    }
    if (options.add) {
      result = this.add(options.add)
    }
    if(options.getAll){
      result = this.movies.getAll()
    }

    if (result) {
      return Promise.resolve(result)
    }
  }
  add(movie): Promise<any> {
    let result = this.movies.add(movie)
      return Promise.resolve(result)
  }
}
export { PelisController };
