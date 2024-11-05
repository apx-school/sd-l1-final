import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  PelisCollection: PelisCollection;
  constructor() {
    this.PelisCollection = new PelisCollection();
  }

  async get(options?: Options) {
    if (options.id) {
      return await this.PelisCollection.getById(options.id);
    }
    if (options.search) {
      return await this.PelisCollection.search(options.search);
    } else {
      return await this.PelisCollection.getAll();
    }
  }

  async add(peli: Peli) {
    await this.PelisCollection.add(peli);
  }
}

export { PelisController, Options };
