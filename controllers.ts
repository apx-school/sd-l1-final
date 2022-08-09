import { PelisCollection, Peli } from "./models";

class PelisController {
  peli: any;
  constructor() {
    this.peli = new PelisCollection();
  }
  async add(peli) {
    return this.peli.add(peli);
  }
  async get(options) {
    if (options.id) {
      return await this.peli.getById(options.id);
    }
    if (options.search) {
      return await this.peli.search(options.search);
    }
    return await this.peli.getAll();
  }
}

export { PelisController };
