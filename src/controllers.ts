import { PelisCollection, Peli } from "./models";

class PelisController {
  private pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  async get(options?: {
    id?: number;
    search?: { title?: string; tag?: string };
  }): Promise<Peli[] | Peli | null> {
    if (options?.id) {
      return await this.pelisCollection.getById(options.id);
    } else if (options?.search) {
      return await this.pelisCollection.search(options.search);
    } else {
      return await this.pelisCollection.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.pelisCollection.add(peli);
  }
}

export { PelisController };
