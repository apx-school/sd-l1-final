import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    if (!options) {
      return this.model.getAll();
    }

    if (options.id) {
      const peli = await this.model.getById(options.id);

      if (peli) {
        return [peli];
      }

      return [];
    }

    if (options.search) {
      return this.model.search(options.search);
    }

    return [];
  }

  async getOne(options?: Options): Promise<Peli | undefined> {
    const resultados = await this.get(options);

    return resultados[0];
  }

  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };