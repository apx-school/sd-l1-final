import { PelisCollection, Peli } from "./models";
import * as _ from "lodash";

class PelisController {
  pelisCollection: PelisCollection;
  promise: Promise<any>
  constructor() {
    this.pelisCollection = new PelisCollection();
    this.promise = this.pelisCollection.getAll();
  }

  get(options: any) {
    if (!options) {
      return this.pelisCollection.getAll();
    }
    if (options.id) {
      return this.pelisCollection.getById(options.id);
    }
    if (options.search) {
      return this.pelisCollection.search(options.search);
    }
  }
  add(peli: any) {
    const pelicula = new Peli();
    pelicula.id = peli.id;
    pelicula.title = peli.title;
    pelicula.tags = peli.tags;
    return this.pelisCollection.add(pelicula);
  }
}
export { PelisController };
