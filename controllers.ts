import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  async get(options: any) {
    if (options._ == "") {
      return this.pelisCollection.getAll();
    }
    if (options.id) {
      return this.pelisCollection.getById(options.id);
    } else if (options.search) {
      if (options.add) {
        return this.pelisCollection.add(options.add);
      }
      if (options.search) {
        return this.pelisCollection.search(options.search);
      }
    }
  }

  add(peli: Peli) {
    return this.pelisCollection.add(peli);
  }
}

export { PelisController };
