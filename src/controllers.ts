import { PelisCollection, Peli } from "./models";

interface Options {
  id?: number;
  search?: { title?: string; tag?: string };
}

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : []; // Si no se encuentra la película, devuelve un array vacío.
    } else if (options?.search) {
      return await this.model.search(options.search);
    } else {
      return await this.model.getAll();
    }
  }

  async getOne(options: Options): Promise<Peli | null> {
    return await this.model.getById(options.id);
  }

  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };



