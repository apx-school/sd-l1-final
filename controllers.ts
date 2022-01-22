import { PelisCollection, Peli } from "./models";

class PelisController {
  listaPelis: PelisCollection;

  constructor() {
    this.listaPelis = new PelisCollection();
  }

  get(options) {
    //si la opcion id existe entra
    if (options.id) {
      return this.listaPelis.getById(options.id);
    }

    if (options.search) {
      return this.listaPelis.search(options.search);
    }

    if (!(options.id || options.search)) {
      return this.listaPelis.getAll();
    }
  }

  add(peli: Peli) {
    return this.listaPelis.add(peli);
  }
}

export { PelisController };
