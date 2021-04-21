import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.search) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis.getAll();
    }
  }

  add(parametros: Peli) {
    const peliNueva = this.pelis.add(parametros);
    return peliNueva;
  }
}
export { PelisController };
