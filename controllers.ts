import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccion: PelisCollection;
  constructor() {
    this.coleccion = new PelisCollection;
  }

  get(options?: any): Promise<any> {
    
    if(options == options.id) {
      return this.coleccion.getById(options.id);

    } else if (options == options.search) {
      return this.coleccion.search(options.search);

    } else {
      return this.coleccion.getAll();
    }
  }
  add(peli: Peli) {
    this.coleccion.add(peli);
  }
}

export { PelisController };
