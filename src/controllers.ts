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
    this.model= new PelisCollection();
  }

  async get(opcion?:Options):Promise<Peli[]>{
    if(opcion?.id){
      const peliBuscada = await this.model.getById(opcion.id);
      return peliBuscada ? [peliBuscada] : [];
    }
    if(opcion?.search){
      return await this.model.search(opcion.search);
    }
    return await this.model.getAll();
  }

  async getOne(options: Options): Promise<Peli | undefined>{
    const pelis = await this.get(options);
    return pelis[0];
  }

  async add(peli:Peli) {
    return await this.model.add(peli);
  }
}
export { PelisController };
