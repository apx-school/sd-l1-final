import { PelisCollection, Peli } from "./models";

class PelisController {
  constructor() {
    const collection = new PelisCollection();
    this.collection = collection;
  }
  collection: PelisCollection;

  get(options) {
    if (options.id) {
      return this.collection.getById(options.id); //en caso de fallo probar con then()
    }

    if (options.search) {
      return this.collection.search(options.search);
    } else {
      return this.collection.getAll();
    }
  }

  add(peli: Peli) {
    return this.collection.add(peli);
  }
}
export { PelisController };
