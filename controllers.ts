import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(options) {
    if (options.hasOwnProperty("id")) {
      return this.peliculas.getById(options.id);
    }
    if (options.hasOwnProperty("search")) {
      return this.peliculas.search(options.search);
    } else {
      return this.peliculas.getAll();
    }
  }

  add(peli) {
    return this.peliculas.add(peli);
  }
}
export { PelisController };
