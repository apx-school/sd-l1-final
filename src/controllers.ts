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

  async get(options?: Options): Promise<Peli[] | []> {
    //Busca por ID
    if (options.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }
    //Busca por search tanto por title y/o por tag
    if (options.search) {
      return await this.model.search(options.search);
    }
    return await this.model.getAll();
  }

  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  async add(peli: Peli) {
    return await this.model.add(peli);
  }
}
export { PelisController };
