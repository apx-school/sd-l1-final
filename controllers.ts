import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options: any) {
    if (options.action) {
      return this.pelis.getAll();
    }
    if (options.id) {
      return this.pelis.getById(options.id);
    } else {
      return this.pelis.search(options);
    }
  }

  add(objeto: Peli) {
    return this.pelis.add(objeto);
  }
}

export { PelisController };
