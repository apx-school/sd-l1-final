import { PelisCollection, Peli, SearchOptions } from "./models";

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
    } else if (options?.search) {
      return await this.model.search(options.search);
    }
    return await this.model.getAll();
  }
  async getOne(options: Options): Promise<Peli> {
    const resultado = await this.get(options);
    return resultado[0];
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}
export { PelisController };
