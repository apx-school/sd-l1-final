import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  async add(peli: Peli) {
    return await this.peliculas.add(peli);
  }

  async get(options?: Options) {
    if (options == null) {
      return await this.peliculas.getAll();
    }
    if (options.id) {
      return await this.peliculas.getById(options.id);
    }
    if (options.search.title && options.search.tag) {
      return await this.peliculas.search(options.search);
    }
    if (options.search.title) {
      return await this.peliculas.search(options.search);
    }
    if (options.search.tag) {
      return await this.peliculas.search(options.search);
    }
  }
}
const probandoController = new PelisController();
// probandoController.get().then((res) => console.log(res));
probandoController.get();
export { PelisController };
