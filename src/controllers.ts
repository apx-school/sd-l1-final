import { PelisCollection, Peli } from "./models";

export type Options = {
  search?: {
    title?: string;
    tag?: string;
  };
  id?: number;
};

export class PelisController {
  collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async add(peli: Peli): Promise<boolean> {
    return this.collection.add(peli);
  }

  async get(options?: Options): Promise<Peli[]> {
    if (!options || (!options.search && !options.id)) {
      return this.collection.getAll();
    }

    if (options.search) {
      return this.collection.search(options.search);
    }

    if (options.id !== undefined) {
      const peli = await this.collection.getById(options.id);
      return peli ? [peli] : [];
    }

    return [];
  }

  async getOne(options: { id: number }): Promise<Peli> {
    const peli = await this.collection.getById(options.id);
    if (!peli) throw new Error("Peli no encontrada");
    return peli;
  }
}
