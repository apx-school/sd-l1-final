import { formatWithOptions } from "util";
import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  constructor() {
    this.movies = new PelisCollection();
  }

  get(options: any): Promise<any> {
    if (options.id) {
      return this.movies.getById(options.id);
    } else if (options.search) {
      return this.movies.search(options.search);
    } else {
      return this.movies.getAll();
    }
  }

  add(peli: Peli) {
    return this.add(peli);
  }
}
export { PelisController };
