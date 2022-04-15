import { PelisCollection, Peli } from "./models";

class PelisController {
  
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options): Promise<any> {

    if (options === null) {
      return this.pelisCollection.getAll();
    }
    
    if (options.id) {
      const idSearched = options.id;
      return this.pelisCollection.getById(idSearched);
    }

    if (options.search) {
      return this.pelisCollection.search(options.search);
    }
  }

  add(arg): Promise<Boolean> {
    return this.pelisCollection.add(arg);
  }

}
export { PelisController };
