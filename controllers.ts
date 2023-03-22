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

  get(options?: Options) {
    if (options.id) {
      return this.pelisCollection.getById(options.id);
    }
    else if (options) {
      return this.pelisCollection.getAll();
    }
    else if (options.search.title) {
      return this.pelisCollection.search(options.search.title);
    }
    else if (options.search.tag) {
      return this.pelisCollection.search(options.search.tag);
    }
}

  add(peli: Peli) {
    return this.pelisCollection.add(peli);
}

}
export { PelisController };
