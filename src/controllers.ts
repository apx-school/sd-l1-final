import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    if (!options) {
      return this.model.getAll();
    }
    if (options.id !== undefined) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }
    if (options.search) {
      return this.model.search({
        title: options.search.title,
        tag: options.search.tag,
      });
    }
    return this.model.getAll();
  }

  getOne(options: Options): Promise<Peli | undefined> {
    return this.get(options).then((pelis) => pelis[0]);
  }

  async add(peli: Peli): Promise<void> {
    await this.model.add(peli);
  }
}

export { PelisController };
