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
    } else if (options.search) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis;
    }
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
