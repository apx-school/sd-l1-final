import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[] | Peli | undefined> {
    if (options?.id) {
      return await this.collection.getById(options.id);
    }

    if (options?.search) {
      return await this.collection.search(options.search);
    }

    return await this.collection.getAll();
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.collection.add(peli);
  }
}

export { PelisController };
