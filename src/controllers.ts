import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection; // Agregá esta línea

  constructor() {
    this.model = new PelisCollection();
  }

  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }

  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    if (options?.search) {
      return this.model.search(options.search);
    }

    return this.model.getAll();
  }

  async getOne(options: Options): Promise<Peli | null> {
    const pelis = await this.get(options);
    return pelis.length > 0 ? pelis[0] : null;
  }
}

export { PelisController };
