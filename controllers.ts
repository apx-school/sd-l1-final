import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  // si pasa ejecuto una funcion del models segun lo que le pase
  getOptions(options: any) {
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.search) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis.getAll();
    }
  }
  // agrego una peli
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}

export { PelisController };
