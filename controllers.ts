import { PelisCollection, Peli } from "./models";

class PelisController {
  peli: PelisCollection;
  constructor() {
    this.peli = new PelisCollection();
  }

  async get(options: any) {
    if (options.id) {
      return await this.peli.getById(options.id);
    }
    if (options.search) {
      return await this.peli.search(options.search);
    }
    if (options.search) {
      return await this.peli.search(options.search);
    } else {
      return await this.peli.getAll();
    }
  }
  async add(peli: Peli) {
    return await this.peli.add(peli);
  }
}

export { PelisController };
