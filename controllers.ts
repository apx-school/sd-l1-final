import { PelisCollection, Peli } from './models';

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options: any) {
    var resultado: any;
    if (options.id) {
      resultado = await this.collection.getById(options.id);
    } else if (options.search) {
      resultado = await this.collection.search(options.search);
    } else {
      resultado = await this.collection.getAll();
    }
    return resultado;
  }

  async add(peli) {
    return await this.collection.add(peli);
  }
}
export { PelisController };
