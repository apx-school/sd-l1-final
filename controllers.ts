import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelisCollection: PelisCollection
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get(options?: Options) {
    if (options.id) {
      return await this.pelisCollection.getById(options.id);
    } else if (options.search) {
      return await this.pelisCollection.search(options.search);
    } else {
      return await this.pelisCollection.getAll();
    }
  }

  add(peli: Peli) {
    return this.pelisCollection.add(peli);
}

}
export { PelisController };
