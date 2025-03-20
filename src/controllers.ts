import { PelisCollection, Peli } from "./models";

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }
  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const pelicula = await this.model.getById(options.id);
      return pelicula ? [pelicula] : [];
    }

    if (options?.search) {
      return await this.model.search(options.search);
    }

    return await this.model.getAll();
  }

  async getOne(option: Options): Promise<Peli | null> {
    const pelis = await this.get(option);
    return pelis.length > 0 ? pelis[0] : null;
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

export { PelisController };
