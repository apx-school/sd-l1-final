import { PelisCollection, Peli } from './models';

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options: any) {
    if (options.id) {
      return await this.collection.getById(options.id);
    } else if (options.search) {
      return await this.collection.search(options.search);
    } else if (options.add) {
      return await this.collection.add(options.add);
    } else {
      return await this.collection.getAll();
    }
  }
}
export { PelisController };
