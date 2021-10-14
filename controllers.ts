import { PelisCollection, Peli } from "./models";

class PelisController {
  pelicula = new PelisCollection();
  constructor() {
    this.pelicula = new PelisCollection();
  }
  get(options): Promise<any> {
    var resultado;
    if (options.id) {
      resultado = this.pelicula.getById(options.id);
    } else if (options.search) {
      resultado = this.pelicula.search(options.search);
    } else {
      resultado = this.pelicula.getAll();
    }
    return resultado;
  }
  add(peli: Peli): Promise<boolean> {
    return this.pelicula.add(peli);
  }
}

export { PelisController };
