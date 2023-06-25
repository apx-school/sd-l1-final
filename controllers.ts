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

  async get(options: Options): Promise<any> {
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.search) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return this.pelis.add(peli);
  }
}

export { PelisController, Options };
