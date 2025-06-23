import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {

  model: PelisCollection

  constructor() {
    this.model = new PelisCollection();
  }

  
  async get(options?:Options):Promise<Peli[]> {
    let result: Peli[] = [];

    if (options?.id) {
      const peli = await this.model.getById(options.id);
      result = peli ? [peli] : [];
    } else if (options?.search) {
      result = await this.model.search(options.search);
    } else {
      result = await this.model.getAll();
    }

    return result;
  }

  async add(peli:Peli){
    var result = await this.model.add(peli)
    return result
  }

  async getOne(options:Options):Promise<Peli> {
    const results = await this.get(options);
    return results[0];
  }
  
}
export { PelisController };
