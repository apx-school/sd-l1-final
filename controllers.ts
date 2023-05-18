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
    }
    if (options.id) {
      resultado = await this.pelis.getById(options.id);
    }
    if (options.search) {
      resultado = await this.pelis.search(options.search);
    }
    return resultado;
  }

  async add(peli: Peli) {
    return await this.pelis.add(peli);
  }
}
export { PelisController, Options };
