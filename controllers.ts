import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promise: Promise<any>;
  constructor() {
    this.pelis = new PelisCollection();
    const promise = this.pelis.getAll();
    this.promise = promise;
  }
  get(options) {
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.title || options.tag) {
      return this.pelis.search(options);
    } else {
      return this.pelis.getAll();
    }
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
