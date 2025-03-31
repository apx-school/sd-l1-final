import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  data: PelisCollection;
  constructor(data: PelisCollection) {
    this.data = data;
  }

  async get(options: Options): Promise<Peli[]> {
    if (options.id) {
      const peli = await this.data.getById(options.id);
      return [peli];
    } else if (options.search && options.search.title) {
      const pelis = await this.data.search(options.search);
      return pelis;
    } else if (options.search && options.search.tag) {
      const pelis = await this.data.search(options.search);
      return pelis;
    } else {
      const pelis = await this.data.getAll();
      return pelis;
    }
  }

  add(peli: Peli) {
    const result = this.data.add(peli);
    return result;
  }
}

export { PelisController, Options };
