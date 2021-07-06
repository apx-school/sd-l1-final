import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisColl: PelisCollection;

  constructor() {
    this.pelisColl = new PelisCollection();
  }

  get(options: any): Promise<any> {
    if (options.id) {
      return this.pelisColl.getById(options.id);
    } else if (options.search) {
      return this.pelisColl.search(options.search);
    } else {
      return this.pelisColl.getAll();
    }
  }

  add(peli: Peli) {
    return this.pelisColl.add(peli);
  }
}

export { PelisController };
