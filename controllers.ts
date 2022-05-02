import { PelisCollection, Peli } from "./models";

class PelisController {
  listFilms: PelisCollection;
  constructor() {
    this.listFilms = new PelisCollection();
  }
  async get(options) {
    if (options.id) {
      return await this.listFilms.getById(options.id);
    } else if (options.search) {
      return await this.listFilms.search(options.search);
    } else {
      return await this.listFilms.getAll();
    }
  }
  add(films: Peli) {
    return this.listFilms.add(films);
  }
}
export { PelisController };
