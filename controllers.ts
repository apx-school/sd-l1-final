import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options) {
    if (options.hasOwnProperty("id")) {
      return this.pelis.getById(options.id);
    } else if (options.title) {
      return this.pelis.search(options);
    }
    if (options.tag) {
      return this.pelis.search(options);
    } else if (options.hasOwnProperty("search")) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis.getAll();
    }
  }
  add(peli): Promise<Peli> {
    return this.pelis.add(peli);
  }
}

export { PelisController };
