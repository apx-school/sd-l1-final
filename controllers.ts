import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  async get(options?: Options): Promise<any> {
    if (options.id) {
      return await this.pelis.getById(options.id);
    } else if (options.search) {
      return await this.pelis.search(options.search);
    }
  }
  async add(peli: Peli) {
    return await this.pelis.add(peli);
  }
}

export { PelisController, Options };
