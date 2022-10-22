import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options?): Promise<any> {
    if (options && options.hasOwnProperty("id")) {
      return this.pelisCollection.getById(options.id);
    } else if (options && options.hasOwnProperty("search")) {
      return this.pelisCollection.search(options.search);
    } else {
      return this.pelisCollection.getAll();
    }
  }

  add(peli?) {
    return this.pelisCollection.add(peli);
  }
}

export { PelisController };
