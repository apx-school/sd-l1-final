import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options) {

    if(options._ == "") {
      return this.pelis.getAll()
    } else if (options.get) {
      return this.pelis.getById(options.get);
    } else if (options.add) {
      return this.pelis.add(options.add)
    } else if (options.search.title && options.search.tag) {
      return this.pelis.search(options.search);
    } else if (options.search.title) {
      return this.pelis.search(options.search);
    } else if (options.search.tag) {
      return this.pelis.search(options.search);
    }
  }
  add(peli: Peli) {
    return this.add(peli);
  }
}

export { PelisController };
