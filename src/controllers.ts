import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  }
}


class PelisController {
  
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection()
  }
  
  async get(options?: Options): Promise<Peli[]>{
    if(options?.id){
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    return this.model.search(options?.search || {})
  }

  async getOne(options: Options): Promise<Peli | undefined> {
    const pelis = await this.get(options);
    return pelis[0];
  }

  async add (peli: Peli): Promise<Boolean>{
    return this.model.add(peli);
  }
}
export { PelisController };
