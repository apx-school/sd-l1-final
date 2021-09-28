import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(opciones) {
    if (opciones.id) {
      return this.peliculas.getById(opciones.id);
    }
    if (opciones.search) {
      return this.peliculas.getById(opciones.search);
    } else {
      return this.peliculas.getAll();
    }
  }
  add(peli: Peli) {
    return this.peliculas.add(peli);
  }
}

export { PelisController };
