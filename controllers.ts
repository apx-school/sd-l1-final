import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection
  constructor() {
    this.peliculas = new PelisCollection()
  };

  get(options: any) {

    var resultado

    if (options.id) {
      resultado = this.peliculas.getById(options.id)

    } else if (options.search) {
      resultado = this.peliculas.search(options.search)

    } else {
      resultado = this.peliculas.getAll()
    }
    return resultado
  };

  add(peli: Peli): Promise<boolean> {
    return this.peliculas.add(peli)
  };

};

export { PelisController };
