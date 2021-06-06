import { PelisCollection, Peli } from "./models";

class PelisController {
  pelicula: PelisCollection;
  constructor() {
     this.pelicula = new PelisCollection;
  }

  get(options: any) {
    if (!options) {
      return this.pelicula.getAll();
    } else if (options.search.title || options.search.tags) {
        return this.pelicula.search(options.search);
    } else if (options.id) {
      return this.pelicula.getById(options.id);
    }
  }

  add(peli:Peli) {
    return this.pelicula.add(peli);
  }
}

export { PelisController };
