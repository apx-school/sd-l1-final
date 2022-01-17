import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    const pelis = new PelisCollection;
    this.peliculas = pelis;
  }

  get (options) {
    if (options.id) {
      return this.peliculas.getById(options.id);
    }

    else if (options.search){
      if (options.search.title) {
        return this.peliculas.search(options.search);
      }
      else if (options.search.tags) {
        return this.peliculas.search(options.tags);
      }
      else if (options.search.title && options.search.tags) {
        return this.peliculas.search(options.search.tags).then((conTag) => {
          return conTag.title.includes(options.search.title);
        });
      }
    }

    else if (!options) {
      return this.peliculas.getAll();
    }
  }

  add (peli: Peli) {
    return this.peliculas.add(peli);
  }
  
}




export { PelisController };
