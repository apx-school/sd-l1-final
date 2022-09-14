import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }
  async get(options) {
    if (options.id) {
      return await this.collection.getById(options.id);
    }

    if (options.search) {
      if (options.search.title && options.search.tag) {
        return await this.collection.search(options.search);
      }
    }

    if (options.search.title) {
      return await this.collection.search(options.search);
    }
    if (options.search.tag) {
      return await this.collection.search(options.search);
    }
  }
  async add(peli: Peli) {
    return await this.collection.add(peli);
  }
}
export { PelisController };
