import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  async get(options): Promise<any> {
    if (options.id) {
      return this.pelis.getById(options.id).then((r) => r);
    } else if (options.search.title || options.search.tag) {
      return this.pelis.search(options.search).then((r) => r);
    } else {
      return this.pelis.getAll();
    }
  }

  add(peli: Peli) {
    const promesa = this.pelis.add(peli);
    return promesa;
  }
  async getAll() {
    const promesa = await this.pelis.getAll();
    return promesa;
  }
}
export { PelisController };
