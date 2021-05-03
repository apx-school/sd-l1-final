import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisColl: PelisCollection;
  constructor() {
    this.pelisColl = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.pelisColl.getById(options.id).then((r) => r);
    }
    if (options.search) {
      return this.pelisColl.search(options.search).then((r) => r);
    } else {
      return this.pelisColl.getAll().then((r) => r);
    }
  }
  add(peli: Peli) {
    return this.pelisColl.add(peli).then((r) => r);
  }
}
export { PelisController };
