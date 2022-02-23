import { PelisCollection, Peli } from "./models";

class PelisController {
  Pelis: PelisCollection;

  constructor() {
    this.Pelis = new PelisCollection();
  }
  async get(options): Promise<any> {
    if (options.id) {
      return await this.Pelis.getById(options.id);
    } else if (options.search) {
      return await this.Pelis.search(options.search);
    } else if (options.empty) {
      return await this.Pelis.getAll();
    }
  }
  add(peli: Peli) {
    return this.Pelis.add(peli);
  }
}

export { PelisController };
