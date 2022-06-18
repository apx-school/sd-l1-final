import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }
async get (options) {

  if (options.id) {
    return await this.peliculas.getById(options.id)
  }
  else if (options.search) {
    return await this.peliculas.search(options.search);

  } else {
    return await this.peliculas.getAll();
  }
  }

  async add(peli: Peli) {
    return this.peliculas.add(peli)
  }

}
export { PelisController };