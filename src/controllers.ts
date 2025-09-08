import { PelisCollection, Peli } from "./models";

export type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

//el constructor esta vacio para que pasen los test
class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }
  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(Number(options.id));

      return peli ? [peli] : [];
    } else if (options?.search) {
      return await this.model.search(options.search);
    }

    return await this.model.getAll();
  }
  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }
  async add(peli: Peli) {
    return this.model.add(peli);
  }
}
export { PelisController };
