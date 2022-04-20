import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }
  async get(options): Promise<any> {
    if (options.id) {
      return await this.collection.getById(options.id);
    } else if (options.search) {
      return await this.collection.search(options.search);
    } else {
      return await this.collection.getAll();
    }
  }
  async add(peli: Peli) {
    return await this.collection.add(peli);
  }
}

export { PelisController };
