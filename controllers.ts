import { PelisCollection, Peli } from "./models";
export type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelisCollection: PelisCollection
  constructor() {
    this.pelisCollection = new PelisCollection;
  }

  async get(options?: Options) {
    if (options.id) {
      return await this.pelisCollection.getById(options.id);
    }
    else if (options.search.title) {
      return await this.pelisCollection.search(options.search.title);
    }
    else if (options.search.tag) {
      return await this.pelisCollection.search(options.search.tag);
    }
    else if (options.search.title && options.search.tag) {
      return await this.pelisCollection.search(options.search.title && options.search.tag)
    }
    else {
      return await this.pelisCollection.getAll();
    }
}

  add(peli: any) {
    return this.pelisCollection.add(peli);
}

}
export { PelisController };
