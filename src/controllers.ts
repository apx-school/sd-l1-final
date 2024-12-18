

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

  // Invoca a los métodos del modelo según las propiedades del options que recibe desde el index
  async get(options: Options): Promise<any> {
    if (options.id) {

      return await this.pelis.getById(options.id);
    }
    if (options.search) {
      return await this.pelis.search(options.search);
    } else {
      return await this.pelis.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.pelis.add(peli);
  }
}

export { PelisController };
