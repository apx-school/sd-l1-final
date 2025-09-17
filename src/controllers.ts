import { PelisCollection, Peli, SearchOptions } from "./models";

export type Options = {
  id?: number;
  search?: SearchOptions;
};

export class PelisController {
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

  async getOne(options: Options): Promise<Peli | null> {
    const lista = await this.get(options);
    return lista.length > 0 ? lista[0] : null;
  }

  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}