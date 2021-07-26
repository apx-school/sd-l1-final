import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection
  constructor() {
    this.peliculas = new PelisCollection()
  }

  get(options){
    if (options.id){
      return this.peliculas.getById(options.id)
    } else if (options.search){
      return this.peliculas.search(options.search.title)
    } else if (options.search){
      return this.peliculas.search(options.search.tags)
    } else if (options.search){
      return this.peliculas.search(options.search.title) && this.peliculas.search(options.search.tags)
    } else {
      return this.peliculas.getAll()
    };

  };

  add(peli:Peli){
    return this.peliculas.add(peli)
  }
};

export { PelisController };
