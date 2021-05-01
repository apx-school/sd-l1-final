import { PelisCollection, Peli } from "./models";

class PelisController {
  moviesCollection: PelisCollection;
  constructor() {
    this.moviesCollection = new PelisCollection();
  }

  get(options): Promise<any> {
    if (options.id) {
      return this.moviesCollection.getById(options.id);
    }

    if (options.search) {
      return this.moviesCollection.search(options.search);
    } else {
      return this.moviesCollection.getAll();
    }
  }

  add(movie: Peli) {
    return this.moviesCollection.add(movie)
  }
}

export { PelisController };
