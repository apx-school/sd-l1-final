import { urlToHttpOptions } from "url";
import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options) {
    if (options.id) {
      return await this.pelis.getById(options.id);
    } else if (options.search) {
      return await this.pelis.search(options.search);
    } else if (options.add) {
      return await this.pelis.add(options.add);
    } else if (options.all) {
      return await this.pelis.getAll();
    }
  }
}

export { PelisController };
