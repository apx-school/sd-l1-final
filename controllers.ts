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

  async get(options: Options): Promise<any> {
    var pelis: Peli[] = [];
    if (options.id) {
      var peli: Peli = await this.pelisCollection.getById(options.id);
      return peli;
    } else if (options.search) {
      pelis = await this.pelisCollection.search(options.search);
    } else {
      pelis = await this.pelisCollection.getAll();
    }

    return pelis;
  }

  add(peli: Peli): void {
    this.pelisCollection.add(peli);
  }
}
export { PelisController };
