import { PelisCollection, Peli } from "./models";
import * as isEmpty from "lodash/isEmpty";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.pelis.getById(options.id);
    }
    if (options.search) {
      return this.pelis.search(options.search);
    }
    if (isEmpty(options)) {
      return this.pelis.getAll();
    }
  }
  add(pelicula) {
    return this.pelis.add(pelicula);
  }
}
export { PelisController };
