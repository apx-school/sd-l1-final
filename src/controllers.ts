import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }
  async addNewMovie(id, title, tags) {
    const newMovie = { id, title, tags };
    const addedMovie = await this.pelis.add(newMovie);
    return addedMovie;
}

  async add(peli: Peli): Promise<boolean> {
    return this.pelis.add(peli);
    
  }

  async get(options?: Options): Promise<any> {
    const lista = await this.pelis.getAll();
    if (options) {
      if (options.id) {
        return lista.find((peli) => peli.id === options.id);
      }
      if (options.search) {
        let result = lista;
        if (options.search.title) {
          result = result.filter((peli) => peli.title && peli.title.includes(options.search.title));
        }
        if (options.search.tag) {
          result = result.filter((peli) => peli.tags && peli.tags.includes(options.search.tag));
        }
        if (!options.search.title && !options.search.tag) {
          result = lista;
        }
        return result;
      }
    }
    
    return lista;
  }
}

export { PelisController };
