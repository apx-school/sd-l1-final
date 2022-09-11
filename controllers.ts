import { PelisCollection, Peli } from "./models";

class PelisController {
  constructor() {
    this.pelis = new PelisCollection();
    this.pelis.getAll();
  }
  pelis: PelisCollection;

  async get(options: any) {
    if (options.id) {
      return await this.pelis.getById(options.id);
    } else if (options.search.title && options.search.tag) {
      return await this.pelis.search(options.search);
    } else if (options.search.title) {
      return await this.pelis.search(options.search);
    } else if (options.search.tag) {
      return await this.pelis.search(options.search);
    } else {
      return await this.pelis;
    }
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.pelis.add(peli);
  }
}
export { PelisController };
