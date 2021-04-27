import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options: any) {
    if (options.action == "esta vacio") {
      return this.pelis.getAll();
    }
    if (options.id) {
      return this.pelis.getById(options.id);
    }
    if (options.search) {
      return this.pelis.search(options);
    }
  }

  add(objeto: Peli) {
    return this.pelis.add(objeto);
  }
}

export { PelisController };
