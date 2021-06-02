import { PelisCollection, Peli } from "./models";

class PelisController {
  peliColl: PelisCollection;

  constructor() {
    this.peliColl = new PelisCollection();
  }

  get(options: any) {
    if (options.id) {
      return this.peliColl.getById(options.id);
    } else if (options.search) {
      return this.peliColl.search(options.search);
    } else {
      return this.peliColl.getAll();
    }
  }

  add(peli: Peli) {
    return this.peliColl.add(peli);
  }
}

export { PelisController };
