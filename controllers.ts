import { PelisCollection, Peli } from "./models";

class PelisController {
  constructor() {}
  controlador = new PelisCollection();
  get(options) {
    if (!options) {
      return this.controlador.getAll();
    }

    if (options.id) {
      return this.controlador.getById(options.id);
    }
    if (options.search.title) {
      return this.controlador.search(options.search.title);
    }
    if (options.search.tag) {
      return this.controlador.search(options.search.tag);
    }
    if (options.search.title && options.search.tag) {
      return this.controlador.search(
        options.search.tag && options.search.title
      );
    }
  }
  add(peli: Peli) {
    return this.controlador.add(peli);
  }
}
export { PelisController };
