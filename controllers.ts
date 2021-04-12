import { PelisCollection, Peli } from "./models";
import * as _ from "lodash";

class PelisController {
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options):Promise<any>{
    // Agrege que si get no recibe nada, devuelva el array completo.
    if (_.isEmpty(options)) {
      return this.pelisCollection.getAll();
    }

    if (options.id) {
      return this.pelisCollection.getById(options.id);
    }

    if (options.search) {
      
      if (options.search.title) {
        return this.pelisCollection.search(options.search);
      }

      if (options.search.tags) {
        return this.pelisCollection.search(options.search);
      }

      if (_.isEmpty(options.search)) {
        return this.pelisCollection.getAll();
      }
    }
  }

  add(options):Promise<any> {
    if (options.add) {
      return this.pelisCollection.add(options.add);}
  }
}

export { PelisController };