import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async getAll(): Promise<Peli[]> {
    return this.model.getAll();
  }

  async get(options?: { id?: number; search?: { title?: string; tag?: string }; }): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }
    if (options?.search) {
      return await this.model.search(options.search);
    }
    return await this.model.getAll();
  }

  

  async getOne(options: { id?: number; search?: { title?: string; tag?: string } }): Promise < Peli | undefined > {
  const pelis = await this.get(options);
  return pelis[0];
}

  async add(peli: Peli): Promise <boolean> {
    return await this.model.add(peli);
  }
}       

export { PelisController };