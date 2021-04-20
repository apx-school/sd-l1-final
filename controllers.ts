import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(options) {
    let resultado;
    if (options.get) {
      resultado = this.peliculas.getById(options.id);
    }
    if (options.search) {
      resultado = this.peliculas.search(options.search);
    } else {
      resultado = this.peliculas.getAll();
    }
    return resultado;
  }

  add(peli) {
    return this.peliculas.add(peli);
  }
}
export { PelisController };
