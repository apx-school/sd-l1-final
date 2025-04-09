import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options?: any): Promise<any> {
    if (options) {
      if (options.id) {
        return this.pelis.getById(options.id);
      }
      if (options.search) {
        return this.pelis.search(options.search);
      }
    }
    return this.pelis.getAll();
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelis.add(peli);
  }
}

export { PelisController };
