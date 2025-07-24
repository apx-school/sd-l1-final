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
    return this.model.getAll();
  }
  async getone(options: Options): Promise<Peli | undefined> {
    return await this.get(options)[0];
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
  async search(options: { title?: string; tag?: string }): Promise<any[]> {
    return this.model.search(options);
  }
}
export { PelisController };
