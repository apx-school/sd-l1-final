import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
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
  
  // ESTE ES EL MÉTODO QUE FALTABA
  async getOne(options: Options): Promise<Peli | undefined> {
    const results = await this.get(options);
    return results[0];
  }

  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };