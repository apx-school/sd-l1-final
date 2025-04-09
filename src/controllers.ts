import { PelisCollection, Peli } from './models';

class PelisController {
  private pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get(options?: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.pelisCollection.getById(options.id);
      return peli ? [peli] : [];
    } else if (options?.search) {
      return this.pelisCollection.search(options.search);
    } else {
      return this.pelisCollection.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelisCollection.add(peli);
  }
}

export { PelisController };
