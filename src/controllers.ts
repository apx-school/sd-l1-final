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
      return peli ? [peli] : this.model.getAll();
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

  async add(peli:Peli){
    const peliAgregada = await this.model.add(peli);
    if(!peliAgregada){
    return console.log("Error al agregar la pelicula")
    }else{
      return this.model.getAll();
    }
  }
}
export { PelisController };