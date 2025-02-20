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
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    if (options?.search) {
      return await this.model.search(options.search);
    }

    return await this.model.getAll();
  }

  async getOne(options: Options): Promise<Peli | null> {
    const pelis = await this.get(options);
    return pelis[0] || null;
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}
export { PelisController };
