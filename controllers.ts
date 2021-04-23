import * as isEmpty from "lodash/isEmpty";
import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.peliculas.getById(options.id);
    }
    if (options.search) {
      return this.peliculas.search(options.search);
    }
    if (isEmpty(options)) {
      return this.peliculas.getAll();
    }
  }
  add(pelicula) {
    return this.peliculas.add(pelicula);
  }
}

export { PelisController };
