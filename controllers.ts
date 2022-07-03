import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  async get(options?) {
    if (options == null) {
      return this.peliculas.getAll();
    }
    else if (options.id) {
      return this.peliculas.getById(options.id);
    }
    else if (options.search) {
      if (options.search.title) {
        return this.peliculas.search(options.search)
      }
      else if (options.search.tags) {
        return this.peliculas.search(options.search)
      }
    }
  }
  async add(peli:Peli) {
    return this.peliculas.add(peli);
  }
}

// mock
// const prueba = new PelisController();
// prueba.get({search: {tags: "belico"} }).then(x => console.log(x));
// prueba.get().then(x => console.log(x));
// prueba.add({id: 69, title: "tu vieja", rating: 100,tags: ["en tanga"], propuesto: "queti"}).then(x => console.log(x));

export { PelisController };
