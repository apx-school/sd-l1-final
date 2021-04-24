import { PelisCollection } from "./models";

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.peliculas.getById(options.id);
    }
    if (options.search) {
      return this.peliculas.search(options.search);
    } else {
      return this.peliculas.getAll();
    }
  }

  add(peli) {
    return this.peliculas.add(peli);
  }
}
export { PelisController };
