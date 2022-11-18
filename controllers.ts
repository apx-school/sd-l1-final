import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options) {
    if (options._ == "") {
      return this.pelis.getAll();
    } else if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.add) {
      return this.pelis.add(options.add);
    } else if (options.search) {
      return this.pelis.search(options.search);
    }
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}

export { PelisController };
