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
    this.pelis.getAll();
  }
  async get(options?: Options): Promise<any> {
    if (options.id) {
      return this.pelis.getById(options.id);
    } else if (options.search && options.search.title) {
      return this.pelis.search(options.search);
    } else if (options.search && options.search.tag) {
      return this.pelis.search(options.search);
    } else if (options.search && options.search.title && options.search.tag) {
      return this.pelis.search(options.search);
    } else {
      return this.pelis.getAll();
    }
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController, Options };
