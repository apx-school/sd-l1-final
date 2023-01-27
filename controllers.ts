import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get(options: Options) {
    let toReturn;
    if (options.id) {
      toReturn = await this.pelisCollection.getById(options.id);
    } else if (options.search.tag || options.search.title) {
      toReturn = await this.pelisCollection.search(options.search);
    }
    return toReturn;
  }
  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}

export { PelisController };
