import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccion: PelisCollection;
  constructor() {
    this.coleccion = new PelisCollection();
  }

  get(options?: any): Promise<any> {

    if(options.id) {
      return this.coleccion.getById(options.id);

    } else if (options.search) {
      return this.coleccion.search(options.search);

    } else {
      return this.coleccion.getAll();
    }
  }
  add(peli: Peli) {
    return this.coleccion.add(peli);
  }
}

export { PelisController };
