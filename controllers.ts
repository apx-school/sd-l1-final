import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  async get(options) {
    if (options.id) {
      return await this.pelis.getById(options.id);
    }
    if (options.search) {
      return await this.pelis.search(options.search);
    }
    return await this.pelis.getAll();
  }

  add(peli: Peli) {
    return this.pelis.add(peli).then((result) => result);
  }
}
export { PelisController };
