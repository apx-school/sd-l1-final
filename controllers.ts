import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection
  constructor() {
    this.peliculas = new PelisCollection()
  };

  get(options) {

    var resultado

    if (options.id) {
      resultado = this.peliculas.getById(options.id)

    } else if (options.search) {
      resultado = this.peliculas.search(options.search)

    } else {
      resultado = this.peliculas.getAll()
    }
  };

  addPeli(peli: Peli) {
    return this.peliculas.add(peli)
  };

};
export { PelisController };
