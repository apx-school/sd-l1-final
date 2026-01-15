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
  listaPelis: Peli[];

  constructor() {
    this.model = new PelisCollection();
    this.listaPelis = [];
  }

  async get(options?:Options):Promise <Peli[]>{
    this.listaPelis = await this.model.getAll();
    if(!options){
      return this.listaPelis
    }

    if(options.id){
      const peli = await this.model.getById(options.id)
      return peli ? [peli] : [];
    }

    if(options.search){
      const pelis = await this.model.search(options.search)
      return pelis;
    }

    return []
  }

  async getOne(option: Options):Promise<Peli | null>{
    const pelis = await this.get(option);
    return pelis.length > 0 ? pelis[0] : null;
  }

  async add(peli: Peli): Promise<boolean>{
    const resultado = await this.model.add(peli)
    return resultado
  }

}




export { PelisController };
