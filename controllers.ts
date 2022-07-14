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
    } else if (options.add) {
      resultado = await this.collection.add(options.add);
    } else if (options.all) {
      resultado = await this.collection.getAll();
    }
    return resultado;
  }

  async add(peli: Peli) {
    return await this.collection.add(peli);
  }
}
export { PelisController };
