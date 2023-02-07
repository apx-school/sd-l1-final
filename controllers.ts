import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get(options?: any): Promise<any> {
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
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
export { PelisController };
