import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }

  get(options) {
    if (options.id) {
      return this.collection.getById(options);
    } else if (options.search) {
      return this.collection.search(options);
    } else if (options.add) {
      return this.collection.add(options);
    } else return this.collection.getAll();
  }
}
export { PelisController };
