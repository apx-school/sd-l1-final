import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
    this.pelis.getAll();
  }

  get(options?) {
    let result;

    if (!options) {
      result = this.pelis.getAll();
    } else if (options.id) {
      result = this.pelis.getById(options.id);
    } else if (options.search.title) {
      result = this.pelis.search(options.search);
    } else if (options.search.tag) {
      result = this.pelis.search(options.search);
    }

    return result;
  }

  add(params) {
    let result = this.pelis.add(params);

    return result;
  }
}

export { PelisController };
