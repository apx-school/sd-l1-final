import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options) {
    // por que pasando el if de options.id primero funciona y si no, no
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.add) {
      // ...
    } else if (options.search.title && options.search.tag) {
      return this.pelis.search(options.search);
    } else if (options.search.title) {
      return this.pelis.search(options.search);
    } else if (options.search.tag) {
      return this.pelis.search(options.search);
    }
    // else if (options) {
    //   console.log("A");
    //   return this.pelis.getAll();
    // }
  }
  add(peli: Peli) {
    return this.add(peli);
  }
}

export { PelisController };
