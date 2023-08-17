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

  async get(options?: Options) {
    let resultado;
    if (!options) {
      resultado = await this.pelis.getAll();
    } else if (options.id) {
      resultado = await this.pelis.getById(options.id);
    } else if (options.search) {
      resultado = await this.pelis.search(options.search);
    }
    return resultado;
  }

  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}

export { PelisController };
