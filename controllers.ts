import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }

  get(options) {
    //Obj con propiedad Id
    if (options.id) {
      return this.peliculas.getById(options.id);
    }
    //Obj con propiedad search
    else if (options.search) {
      return this.peliculas.search(options.search);
    }
    //Sin parámetros recibidos devuelve todas las películas
    else {
      return this.peliculas.getAll();
    }
  }

  //Recibe un obj y crea una película
  add(peli: Peli) {
    return this.peliculas.add(peli);
  }
}

export { PelisController };
