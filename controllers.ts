import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.collection.getById(options.id);
    }
    if (options.search.title || options.search.tag) {
      return this.collection.search(options.search);
    }
    if (options.search) {
      return this.collection.getAll();
    }
  }
  add(peli: Peli) {
    return this.collection.add(peli);
  }
}

export { PelisController };
