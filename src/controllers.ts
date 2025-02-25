import { PelisCollection, Peli } from './models';

export type Options = {
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

  async get(options?: Options): Promise<Peli[]> {
    if (!options) return await this.pelis.getAll();

    const { id, search } = options;

    if (id) {
      const pelicula = await this.pelis.getById(id);
      return pelicula ? [pelicula] : [];
    }

    if (search) {
      return await this.pelis.search(search);
    }

    return await this.pelis.getAll();
  }

  async getOne(options?: Options): Promise<Peli | undefined> {
    return (await this.get(options)).at(0);
  }

  async add(pelicula: Peli) {
    await this.pelis.add(pelicula);
  }
}

export { PelisController };
