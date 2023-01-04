import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
    this.pelis.getAll();
  }

  async get(options?: any) {
    console.log(options);

    if (!options) {
      return await this.pelis.getAll();
    } else if (options.id) {
      return await this.pelis.getById(options.id);
    } else if (options.search) {
      return await this.pelis.search(options.search);
    }
  }

  async add(peli:Peli) {
    return await this.pelis.add(peli);
  }
}
export { PelisController };
