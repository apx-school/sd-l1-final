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
    } else if (options?.search) {
      return await this.model.search(options.search);
    } else {
      return await this.model.getAll();
    }
  } 
  async getOne(options: Options): Promise<Peli> {
    const results = await this.get(options);
    return results[0];
  }

  add(peli:Peli){
    return this.model.add(peli);
  }
}
export { PelisController };
