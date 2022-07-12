import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  async get(option: any) {
    if (option.id) {
      return await this.peliculas.getById(option.id);
    } else if (option.search) {
      return await this.peliculas.search(option.search);
    } else if (option.add) {
      return await this.peliculas.add(option.add);
    } else if (option.all) {
      return await this.peliculas.getAll();
    }
  }
}
export { PelisController };
